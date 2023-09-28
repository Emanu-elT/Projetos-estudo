/**************************************************************************/
/* LabWindows/CVI User Interface Resource (UIR) Include File              */
/*                                                                        */
/* WARNING: Do not add to, delete from, or otherwise modify the contents  */
/*          of this include file.                                         */
/**************************************************************************/

#include <userint.h>

#ifdef __cplusplus
    extern "C" {
#endif

     /* Panels and Controls: */

#define  PANEL                            1
#define  PANEL_OKBUTTON                   2       /* control type: command, callback function: OkCallback */
#define  PANEL_QUITBUTTON                 3       /* control type: command, callback function: QuitCallback */
#define  PANEL_DECORATION_3               4       /* control type: deco, callback function: (none) */
#define  PANEL_DECORATION_2               5       /* control type: deco, callback function: (none) */
#define  PANEL_DECORATION                 6       /* control type: deco, callback function: (none) */
#define  PANEL_TEXTMSG                    7       /* control type: textMsg, callback function: (none) */
#define  PANEL_LBComPortList              8       /* control type: listBox, callback function: LBComPortList */
#define  PANEL_CLOSECOMCONTROL            9       /* control type: command, callback function: OnClosePortPress */
#define  PANEL_OPENCOMCONTROL             10      /* control type: command, callback function: OnOpenPortPress */
#define  PANEL_TEXTMSG_2                  11      /* control type: textMsg, callback function: (none) */
#define  PANEL_TEXTMSG_3                  12      /* control type: textMsg, callback function: (none) */
#define  PANEL_Comstatusbox               13      /* control type: textBox, callback function: Comstatusbox */
#define  PANEL_OBLED4                     14      /* control type: textButton, callback function: ONLEDPRESS4 */
#define  PANEL_OBLED3                     15      /* control type: textButton, callback function: ONLEDPRESS3 */
#define  PANEL_OBLED2                     16      /* control type: textButton, callback function: ONLEDPRESS2 */
#define  PANEL_OBLED1                     17      /* control type: textButton, callback function: ONLEDPRESS1 */
#define  PANEL_ILED4                      18      /* control type: LED, callback function: LightLED4 */
#define  PANEL_ILED3                      19      /* control type: LED, callback function: LightLED3 */
#define  PANEL_ILED2                      20      /* control type: LED, callback function: LightLED2 */
#define  PANEL_ILED1                      21      /* control type: LED, callback function: LightLED1 */


     /* Control Arrays: */

          /* (no control arrays in the resource file) */


     /* Menu Bars, Menus, and Menu Items: */

          /* (no menu bars in the resource file) */


     /* Callback Prototypes: */

int  CVICALLBACK Comstatusbox(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK LBComPortList(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK LightLED1(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK LightLED2(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK LightLED3(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK LightLED4(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK OkCallback(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK OnClosePortPress(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK ONLEDPRESS1(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK ONLEDPRESS2(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK ONLEDPRESS3(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK ONLEDPRESS4(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK OnOpenPortPress(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);
int  CVICALLBACK QuitCallback(int panel, int control, int event, void *callbackData, int eventData1, int eventData2);


#ifdef __cplusplus
    }
#endif
