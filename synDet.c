/*David Abbot, CSCE 4560, Group 1, Final Project*/
#include <sys/types.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#define MAXCON 10     //max number of connections you want to allow from one IP address
struct ipList  //struct for connection IPs and their count of appear with code 03 type connection
{
    char addr[9];
    int count;
};
int main() 
{
    char buffer[140], buffer2[1000][140], *token, add[9];  //buffer for reading in tcp file by lines, putting it in multi-d array, adding IP address and getting tokens from lines
    
    FILE* tcpF;                 //for file

    while(1)
    {
        struct ipList list[200];  //struct of connections
        int i=0, count=0;
        memset(buffer, 0, sizeof(buffer));
        memset(buffer2, 0, sizeof(buffer2));
        memset(list, 0, sizeof(list));

        tcpF = fopen("/proc/net/tcp", "r");         //write buffer of printed statement to log
        while(fgets(buffer, 140, tcpF) != NULL)
        {
            strcat(&buffer2[i][0], buffer);  //build buffer from file content lines
            bzero(buffer, 140);
            i++;   
        }
        fclose(tcpF);
        for(int k =1; k<i; k++)          //loop for reading every file line and checking conneciton type
        {
            int f =0;
            token = strtok(&buffer2[k][0], " \t");
            while(f<4&&token!=NULL)      //only go through first four strings of info per line
            {
                if(f==2&&strlen(token)==13)         //get the foreign IP
                {
                    strncpy(add, token, 8);
                }
                if(f==3)                    //get connection type
                {
                    if(strcmp(token,"03")==0||strcmp(token,"01")==0)        //if is of type TCP_ESTABLISHED or TCP_SYN_RECV
                    {
                        for(int z = 0; z<=count; z++)     //for checking in struct if IP already is listed
                        {
                            if(strcmp(list[z].addr, add)==0)     //add to count if address already in array
                            {
                                list[z].count++;
                                break;
                            }
                            else
                            {
                                if(count==z)         //add IP address in it's little endian hex form if not already in struct array
                                {
                                    strcpy(list[count].addr, add);
                                    list[count].count++;
                                    count++;
                                    break;
                                }
                            }

                        }
                    }
                }
                token = strtok(NULL, " ");
                f++;
            }
        }
        for(int r=0; r<count; r++)          //check counts of IPs in struct array
        {
            
            if(list[r].count>MAXCON)      // check if IP count is above determined MAX 
            {
                /*translating little endian hex to IP format bellow*/
                char dest1[3];                         
                char dest2[3];
                char dest3[3];
                char dest4[3];
                strncpy(dest1, list[r].addr, 2);
                strncpy(dest2, list[r].addr+2, 2);
                strncpy(dest3, list[r].addr+4, 2);
                strncpy(dest4, list[r].addr+6, 2);
                long l1;
                long l2;
                long l3;
                long l4;
                l4=strtoul(dest1, NULL, 16);
                l3=strtoul(dest2, NULL, 16);
                l2=strtoul(dest3, NULL, 16);
                l1=strtoul(dest4, NULL, 16);
                char addToBlock[16];   //char array for normal IP format
                
                
                printf("IP address %s caught with %d connections!\n", addToBlock, list[r].count);
                memset(addToBlock, '\0', sizeof(addToBlock));
                sprintf(addToBlock, "%lu.%lu.%lu.%lu", l1, l2, l3, l4); //create normal IP format

                char command[100];    //for syst commands
                memset(command, 0, sizeof(command));
                strcpy(command, "firewall-cmd --zone=trusted --remove-source=");  //remove from trusted if IP is in trusted zone
                strcat(command, addToBlock);
                system(command);
                memset(command, 0, sizeof(command));
                strcpy(command, "firewall-cmd --zone=public --remove-source=");   //remove from public if in public
                strcat(command, addToBlock);
                system(command);
                memset(command, 0, sizeof(command));
                strcpy(command, "firewall-cmd --permanent --add-rich-rule=\"rule family='ipv4' source address='");   //add IP to drop list
                strcat(command, addToBlock);
                strcat(command, "' drop\"");
                system(command);
                memset(command, 0, sizeof(command));
                strcpy(command, "firewall-cmd --reload");  //reload firewalld
                system(command);
                
                printf("TCP flood detected and IP address %s banned.\n", addToBlock);   //let know attack was detected
            }
        }
    }
    
}