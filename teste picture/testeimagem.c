#include "testesec.h"
#include <cvirte.h>		
#include <userint.h>
#include "testeimagem.h"

static int panelH2;

static int panelHandle, ctrlarray;

int main (int argc, char *argv[])
{
	if (InitCVIRTE (0, argv, 0) == 0)
		return -1;	/* out of memory */
	if ((panelH2 = LoadPanel (0, "testesec.uir", PANEL)) < 0)//testa e carrega o arquivo(importante)
	return -1;//fecha o programa
	DisplayPanel (panelH2);//Apresenta o painel desejado
	RunUserInterface ();//Inicializa a apresentação
	DiscardPanel (panelH2); //discarta a tela
	if ((panelHandle = LoadPanel (0, "testeimagem.uir", PANEL)) < 0)
		return -1;
	ctrlarray = GetCtrlArrayFromResourceID (panelHandle, CTRLARRAY);
	DisplayPanel (panelHandle);
	RunUserInterface ();
	DiscardPanel (panelHandle);
//	return 0;
	return 0;//finaliza o programa
}

int CVICALLBACK PICTURE (int panel, int control, int event,
						 void *callbackData, int eventData1, int eventData2)
{
	int picImage;
	/* Display an image from an image file */ 
	//picImage = NewCtrl (panelHandle, CTRL_PICTURE_LS, "From Image File", 25, 20);   
    DisplayImageFile (PANEL, PANEL_PICTURE, "renalt.bmp");
	return 0;
}

int CVICALLBACK OKBUTTON (int panel, int control, int event,
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

int CVICALLBACK exitButton (int panel, int control, int event,
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
