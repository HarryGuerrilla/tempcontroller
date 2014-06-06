EESchema Schematic File Version 2
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
EELAYER 27 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "noname.sch"
Date "6 jun 2014"
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L THERMISTOR TH?
U 1 1 538D4838
P 7550 3950
F 0 "TH?" V 7650 4000 50  0000 C CNN
F 1 "THERMISTOR" V 7450 3950 50  0000 C CNN
F 2 "~" H 7550 3950 60  0000 C CNN
F 3 "~" H 7550 3950 60  0000 C CNN
	1    7550 3950
	1    0    0    -1  
$EndComp
$Comp
L R R?
U 1 1 538D484C
P 7550 3450
F 0 "R?" V 7630 3450 40  0000 C CNN
F 1 "10K" V 7557 3451 40  0000 C CNN
F 2 "~" V 7480 3450 30  0000 C CNN
F 3 "~" H 7550 3450 30  0000 C CNN
	1    7550 3450
	1    0    0    -1  
$EndComp
$Comp
L BEAGLEBONE_BLACK P?
U 1 1 538D4F55
P 6350 3550
F 0 "P?" H 6350 4850 60  0000 C CNN
F 1 "BEAGLEBONE_BLACK" V 6350 3550 50  0000 C CNN
F 2 "~" H 6350 3550 60  0000 C CNN
F 3 "~" H 6350 3550 60  0000 C CNN
	1    6350 3550
	1    0    0    -1  
$EndComp
Wire Wire Line
	6750 3850 7000 3850
Wire Wire Line
	7000 3850 7000 3200
Wire Wire Line
	7000 3200 7550 3200
Wire Wire Line
	7550 4200 7250 4200
Wire Wire Line
	7250 4200 7250 3950
Wire Wire Line
	7250 3950 6750 3950
Wire Wire Line
	6750 4250 7150 4250
Wire Wire Line
	7150 4250 7150 3700
Wire Wire Line
	7150 3700 7550 3700
$Comp
L AGND #PWR?
U 1 1 538D514D
P 7000 4450
F 0 "#PWR?" H 7000 4450 40  0001 C CNN
F 1 "AGND" H 7000 4380 50  0000 C CNN
F 2 "" H 7000 4450 60  0000 C CNN
F 3 "" H 7000 4450 60  0000 C CNN
	1    7000 4450
	1    0    0    -1  
$EndComp
Wire Wire Line
	6750 3950 6750 3950
Wire Wire Line
	6750 3950 7000 3950
Wire Wire Line
	7000 3950 7000 4450
Connection ~ 6750 3950
$EndSCHEMATC
