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

import sys, getopt

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
#image = Image.new('1', (width, height))
image = Image.open('/home/tony/tempcontroller/assets/oled.ppm').convert('1')

# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)

# Load default font.
font = ImageFont.truetype('/home/tony/tempcontroller/public/fonts/Minecraftia-Regular.ttf', 18)

target = ''
ambient = ''
current = ''

try:
    opts, args = getopt.getopt(sys.argv[1:],"t:a:c:")
except getopt.GetoptError:
    print 'display.py -c <currentTemp> -t <targetTemp> -a <ambientTmep>'
    sys.exit(2)
for opt, arg in opts:
    if opt in ('-c'):
        current = arg
    elif opt == '-t':
        target = arg
    elif opt == '-a':
        ambient = arg

# Write two lines of text.
draw.text((24, 4),   current,  font=font, fill=255)
draw.text((102, 4),  target, font=font, fill=255)

# Display image.
disp.image(image)
disp.display()
