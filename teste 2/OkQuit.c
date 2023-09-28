#include <cvirte.h>		
#include <userint.h>
#include "OkQuit.h"
#include <rs232.h>
static int panel;
static int iopencomport;
 static int iOpenComPortStatus=0;  
int main (int argc, char *argv[])
{
	if (InitCVIRTE (0, argv, 0) == 0)
		return -1;	/* out of memory */
	if ((panel = LoadPanel (0, "OkQuit.uir", PANEL)) < 0)
		return -1;
	DisplayPanel (panel);
	RunUserInterface ();
	DiscardPanel (panel);
	return 0;
}
int CVICALLBACK OkCallback (int panel, int control, int event,
							void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:
			QuitUserInterface (0);

			break;
	}
	return 0;
}

int CVICALLBACK QuitCallback (int panel, int control, int event,
							  void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:
			QuitUserInterface (0);
			break;
	}
	return 0;
}

int CVICALLBACK OnOpenPortPress (int panel, int control, int event,
								 void *callbackData, int eventData1, int eventData2)
{
	int iSelectComPort=0;
	int icomportopenerror=0;
	
	switch (event)
	{
		case EVENT_COMMIT:
			GetCtrlVal(PANEL, PANEL_LBComPortList,&iSelectComPort);
			//icomportopenerror= OpenComConfig(iSelectComPort, " ", 2400, 0, 8, 1, 512, 512);
			if(icomportopenerror>=0){
				//Sucesso pode pedir musica
				SetCtrlVal(PANEL, PANEL_Comstatusbox, "Porta Com Aberta");
				iOpenComPortStatus=1; 
				SetCtrlAttribute(PANEL, PANEL_OPENCOMCONTROL,ATTR_DIMMED, 1);
				SetCtrlAttribute(PANEL, PANEL_OPENCOMCONTROL,ATTR_DIMMED, 0);
			}
			else
			{
				//Fracasso sfd falha na porta
				SetCtrlVal(PANEL, PANEL_Comstatusbox, "Porta Com Falha na sincronização");
				SetCtrlVal(PANEL, PANEL_Comstatusbox, GetRS232ErrorString(icomportopenerror)); 
			}
			break;
	}
	return 0;
}

int CVICALLBACK OnClosePortPress (int panel, int control, int event,
								  void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK ONLEDPRESS1 (int panel, int control, int event,
							 void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK ONLEDPRESS2 (int panel, int control, int event,
							 void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK ONLEDPRESS4 (int panel, int control, int event,
							 void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK ONLEDPRESS3 (int panel, int control, int event,
							 void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK LightLED1 (int panel, int control, int event,
						   void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK LightLED2 (int panel, int control, int event,
						   void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK LightLED3 (int panel, int control, int event,
						   void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK LightLED4 (int panel, int control, int event,
						   void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK Comstatusbox (int panel, int control, int event,
							  void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}

int CVICALLBACK LBComPortList (int panel, int control, int event,
							   void *callbackData, int eventData1, int eventData2)
{
	switch (event)
	{
		case EVENT_COMMIT:

			break;
	}
	return 0;
}
