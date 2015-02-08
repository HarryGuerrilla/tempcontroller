EESchema Schematic File Version 2
LIBS:TempController
LIBS:power
LIBS:device
LIBS:transistors
LIBS:conn
LIBS:linear
LIBS:regul
LIBS:74xx
LIBS:cmos4000
LIBS:adc-dac
LIBS:memory
LIBS:xilinx
LIBS:special
LIBS:microcontrollers
LIBS:dsp
LIBS:microchip
LIBS:analog_switches
LIBS:motorola
LIBS:texas
LIBS:intel
LIBS:audio
LIBS:interface
LIBS:digital-audio
LIBS:philips
LIBS:display
LIBS:cypress
LIBS:siliconi
LIBS:opto
LIBS:atmel
LIBS:contrib
LIBS:valves
LIBS:beagleboneblack
LIBS:beaglebone
LIBS:boneheaderlib
LIBS:beagleboard
LIBS:tempcontroller-cache
LIBS:tempcontroller-cache
EELAYER 27 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "noname.sch"
Date "8 feb 2015"
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L DS18B20 IC?
U 1 1 54D6B80B
P 1850 2150
F 0 "IC?" H 1750 2550 60  0000 C CNN
F 1 "DS18B20" H 1850 2450 60  0000 C CNN
F 2 "~" H 1850 2150 60  0000 C CNN
F 3 "~" H 1850 2150 60  0000 C CNN
	1    1850 2150
	0    -1   -1   0   
$EndComp
$Comp
L BEAGLEBONE_BLACK P?
U 2 1 54D71F34
P 3500 3250
F 0 "P?" H 3500 4550 60  0000 C CNN
F 1 "BEAGLEBONE_BLACK" V 3500 3250 50  0000 C CNN
F 2 "~" H 3500 3250 60  0000 C CNN
F 3 "~" H 3500 3250 60  0000 C CNN
	2    3500 3250
	1    0    0    -1  
$EndComp
$Comp
L R R?
U 1 1 54D79215
P 2550 2400
F 0 "R?" V 2630 2400 40  0000 C CNN
F 1 "4.7 K" V 2557 2401 40  0000 C CNN
F 2 "~" V 2480 2400 30  0000 C CNN
F 3 "~" H 2550 2400 30  0000 C CNN
	1    2550 2400
	1    0    0    -1  
$EndComp
Wire Wire Line
	2250 2150 2550 2150
Wire Wire Line
	2550 2150 2650 2150
Wire Wire Line
	2650 2150 2650 1850
Wire Wire Line
	2650 1850 4000 1850
Wire Wire Line
	4000 1850 4000 3050
Wire Wire Line
	4000 3050 3900 3050
Connection ~ 2550 2150
Wire Wire Line
	2250 2250 2400 2250
Wire Wire Line
	2400 2250 2400 2650
Wire Wire Line
	2400 2650 2550 2650
Wire Wire Line
	2550 2650 2800 2650
Wire Wire Line
	2800 2650 2800 2150
Wire Wire Line
	2800 2150 3100 2150
Connection ~ 2550 2650
Wire Wire Line
	2250 2050 3100 2050
$Comp
L AGND #PWR?
U 1 1 54D79309
P 3100 1600
F 0 "#PWR?" H 3100 1600 40  0001 C CNN
F 1 "AGND" H 3100 1530 50  0000 C CNN
F 2 "~" H 3100 1600 60  0000 C CNN
F 3 "~" H 3100 1600 60  0000 C CNN
	1    3100 1600
	-1   0    0    1   
$EndComp
Wire Wire Line
	3100 2050 3100 1600
$EndSCHEMATC
