def on_received_string(receivedString):
    global command, s0, s1, s2, true_false
    command = parse_float(receivedString)
    if command & S1_RIGHT:
        s0 = degrees(s0, -10)
    elif command & S1_LEFT:
        s0 = degrees(s0, 10)
    if command & S2_BACK:
        s1 = degrees(s1, -10)
    elif command & S2_FORWARD:
        s1 = degrees(s1, 10)
    if command & S3_BACK:
        s2 = degrees(s2, -10)
    elif command & S3_FORWARD:
        s2 = degrees(s2, 10)
    if command & PINCH_CLOSE:
        if not (true_false):
            wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 20)
            true_false = 1
        else:
            wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 90)
            true_false = 0
    elif command & PINCH_OPEN:
        wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 90)
    if command & CAR_FORWARD:
        wuKong.set_all_motor(50, 50)
        basic.pause(200)
        wuKong.stop_all_motor()
    elif command & CAR_BACK:
        wuKong.set_all_motor(-50, -50)
        basic.pause(200)
        wuKong.stop_all_motor()
    if command & CAR_RIGHT:
        wuKong.set_all_motor(50, -50)
        basic.pause(200)
        wuKong.stop_all_motor()
    elif command & CAR_LEFT:
        wuKong.set_all_motor(-50, 50)
        basic.pause(200)
        wuKong.stop_all_motor()
radio.on_received_string(on_received_string)

def degrees(servo: number, add_degrees: number):
    global rotate_servo_degrees
    rotate_servo_degrees = servo + add_degrees
    if not (rotate_servo_degrees < 0 or rotate_servo_degrees > 180):
        return rotate_servo_degrees
    else:
        return servo
rotate_servo_degrees = 0
true_false = 0
s2 = 0
s1 = 0
s0 = 0
command = 0
wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, 90)
s0 = 90
wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 0)
s1 = 0
wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S2, 90)
s2 = 90
wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 90)
S1_RIGHT = 1
S1_LEFT = 2
S2_BACK = 4
S2_FORWARD = 8
S3_BACK = 16
S3_FORWARD = 32
PINCH_OPEN = 64
PINCH_CLOSE = 128
CAR_FORWARD = 256
CAR_BACK = 512
CAR_RIGHT = 1024
CAR_LEFT = 2048
again = 4096
true_false = 0
radio.set_group(1)

def on_forever():
    wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, s0)
    wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, s1)
    wuKong.set_servo_angle(wuKong.ServoTypeList._180, wuKong.ServoList.S2, s2)
basic.forever(on_forever)
