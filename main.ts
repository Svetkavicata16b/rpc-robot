function градуси(servo: number, добавени_градуси: number): number {
    
    завъртяно_servo_градуси = servo + добавени_градуси
    if (!(завъртяно_servo_градуси < 0 || завъртяно_servo_градуси > 180)) {
        return завъртяно_servo_градуси
    } else {
        return servo
    }
    
}

radio.onReceivedString(function on_received_string(receivedString: string) {
    
    command = parseFloat(receivedString)
    if (command & S1_RIGHT) {
        s0 = градуси(s0, 10)
    } else if (command & S1_LEFT) {
        s0 = градуси(s0, -10)
    }
    
    if (command & S2_BACK) {
        s1 = градуси(s1, 10)
    } else if (command & S2_FORWARD) {
        s1 = градуси(s1, -10)
    }
    
    if (command & S3_BACK) {
        s2 = градуси(s2, 10)
    } else if (command & S3_FORWARD) {
        s2 = градуси(s2, -10)
    }
    
    if (command & PINCH_CLOSE) {
        if (!true_false) {
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 20)
            true_false = 1
        } else {
            wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 90)
            true_false = 0
        }
        
    } else if (command & PINCH_OPEN) {
        wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 90)
    }
    
    if (command & CAR_FORWARD) {
        wuKong.setAllMotor(50, 50)
        basic.pause(200)
        wuKong.stopAllMotor()
    } else if (command & CAR_BACK) {
        wuKong.setAllMotor(-50, -50)
        basic.pause(200)
        wuKong.stopAllMotor()
    }
    
    if (command & CAR_RIGHT) {
        wuKong.setAllMotor(50, -50)
        basic.pause(200)
        wuKong.stopAllMotor()
    } else if (command & CAR_LEFT) {
        wuKong.setAllMotor(-50, 50)
        basic.pause(200)
        wuKong.stopAllMotor()
    }
    
})
let завъртяно_servo_градуси = 0
let true_false = 0
let s2 = 0
let s1 = 0
let s0 = 0
let command = 0
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, 90)
s0 = 90
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, 180)
s1 = 180
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S2, 90)
s2 = 90
wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S3, 90)
let S1_RIGHT = 1
let S1_LEFT = 2
let S2_BACK = 4
let S2_FORWARD = 8
let S3_BACK = 16
let S3_FORWARD = 32
let PINCH_OPEN = 64
let PINCH_CLOSE = 128
let CAR_FORWARD = 256
let CAR_BACK = 512
let CAR_RIGHT = 1024
let CAR_LEFT = 2048
let again = 4096
true_false = 0
radio.setGroup(1)
basic.forever(function on_forever() {
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S0, s0)
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S1, s1)
    wuKong.setServoAngle(wuKong.ServoTypeList._180, wuKong.ServoList.S2, s2)
})
