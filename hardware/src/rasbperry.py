#!/usr/bin/env python3

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

GPIO.setup(7, GPIO.IN)
GPIO.setup(11, GPIO.IN)
GPIO.setup(38, GPIO.OUT)

def button_callback1(channel):
    GPIO.output(38, GPIO.HIGH)
    time.sleep(2)
    GPIO.output(38, GPIO.LOW)

def button_callback2(channel):
    GPIO.output(38, GPIO.HIGH)
    time.sleep(2)
    GPIO.output(38, GPIO.LOW)
    
GPIO.add_event_detect(7, GPIO.FALLING, callback=button_callback1, bouncetime=150)
GPIO.add_event_detect(11, GPIO.FALLING, callback=button_callback2, bouncetime=150)
    
while True:
    time.sleep(0.2)