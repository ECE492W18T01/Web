'''
Creation date: March 1, 2018

Created by Steven Lagrange
Modified by Steven Lagrange

Raspberry pi camera setup for streaming
'''
from io import BytesIO
import socket
import struct
from time import sleep
from picamera import PiCamera
import threading

class Camera(threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)
        self.frame = None
        self.stream = BytesIO()
        self.format = 'jpeg'


    def run(self):
        with PiCamera() as picamera:
            picamera.resolution = (160, 120)
            picamera.framerate = 15
            picamera.rotation = 270
            picamera.hflip = False
            picamera.vflip = False
            try:
                for frame in picamera.capture_continuous(self.stream, self.format, use_video_port=True):
                        self.stream.seek(0)
                        self.frame = self.stream.read()
                        self.stream.seek(0)
                        self.stream.truncate()
            finally:
                print('Stream has ended.')


    def get_frame(self):
        return self.frame
