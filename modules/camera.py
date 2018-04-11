from io import BytesIO
import socket
import struct
from time import sleep
from picamera import PiCamera
from streaming_client import StreamingClient
from frame import Frame


class Camera(object, threading.Thread):

    def __init__(self):
        threading.Thread.__init__(self)
        self.frame = None
        self.stream = BytesIO()
        self.format = 'jpeg'


    def run(self):
        with PiCamera() as picamera:
            picamera.resolution = (640, 480)
            picamera.framerate = 30
            try:
                for frame in camera.capture_continuous(self.stream, self.format, use_video_port=True):
                        self.stream.seek(0)
                        self.frame = self.stream.read()
                        self.stream.seek(0)
                        stream.truncate()
            finally:
                print('Stream has ended.')


    def get_frame(self):
        return self.frame
