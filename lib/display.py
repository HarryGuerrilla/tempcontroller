# Copyright (c) 2014 Adafruit Industries
# Author: Tony DiCola
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
import time

import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306

import Image
import ImageDraw
import ImageFont

import json
import urllib2

# Beaglebone Black pin configuration:
RST = 'P9_12'

# 128x32 display with hardware I2C:
disp = Adafruit_SSD1306.SSD1306_128_32(rst=RST)

# Initialize library.
disp.begin()

# Clear display.
disp.clear()
disp.display()

# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
width = disp.width
height = disp.height

image = Image.open('/home/tony/tempcontroller/assets/oled.ppm').convert('1')

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# Load default font.
font = ImageFont.truetype('/home/tony/tempcontroller/public/fonts/Minecraftia-Regular.ttf', 18)

target = ''
current = ''

while True:
    try:
        data = json.load(urllib2.urlopen('http://localhost:3001/api/current-temp'))
        current = str(data['current_temp'])
        data = json.load(urllib2.urlopen('http://localhost:3001/api/current-target'))
        target = str(data['target']['temperature'])
        draw.rectangle((19,0,83,height), outline=0, fill=0)
        draw.rectangle((102,0,128,height), outline=0, fill=0)
        draw.text((24, 4),   current,  font=font, fill=255)
        draw.text((102, 4),  target, font=font, fill=255)
        disp.image(image)
        disp.display()
        time.sleep(1)
    except:
        disp.clear()
        disp.display()
        break
