import firebase_admin
from firebase_admin import credentials, db
import datetime
import time
import random

cred = credentials.Certificate('serviceAccountKey.json')
firebase_default_app = firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://humidtemp-59706.firebaseio.com/'
})

flag_color = ['White', 'Green', 'Yellow', 'Red', 'Black']
unit_id = ['A01', 'A02', 'A03', 'A04']
unit_name = ['ส.1 พัน.101', 'ส.1 พัน.102', 'พัน.นร.รร.ส.สส', 'พัน.ส.ซบร.เขตหลัง']
latitude = [13.6600217, 13.6623712, 13.6624533, 13.6643514]
longtitude = [100.2940463, 100.2963192, 100.3020063, 100.301194]
line1 = ['E1QJNjNKezYHHrZK3iAJm3IzQDrlnhKIQ6RtQ77ROdg', 'adfvadzfbrbsfabadfb', 'U9J6cZs6atD8M7IFb3pHpcKCS94kapYjx5jB5k9Mdue', 'asdgdsagsdafgsdagds']
line2 = ['asdgdsagsdafgsdagds', 'asdgdsagsdafgsdagds', 'asdgdsagsdafgsdagds', 'asdgdsagsdafgsdagds']
train_time = [60, 50, 45, 30, 20]

idx = random.randint(0, 3)

while(1):
    current_time = datetime.datetime.now().strftime("%Y%m%d-%H:%M:%S")
    # idx = random.randint(0, 3)
    print(current_time)
    for idx in range(0,4):
        # Get a database reference to our blog.
        firebase_ref = db.reference('/')
        curr_ref = firebase_ref.child('ID/' + unit_id[idx] + '/Current')
        log_ref = firebase_ref.child('ID/' + unit_id[idx] + '/Log/' + current_time)
        # curr_ref = firebase_ref.child('ID').child(unit_id[idx]).child('Current')
        # log_ref = firebase_ref.child('ID').child(unit_id[idx]).child('Log').child(current_time)

        flag_idx = random.randint(0, 4)
        data = {
                    'Battery_level': "50%",
                    'DateTime': current_time,
                    'Flag': flag_color[flag_idx],
                    'HID': float("{0:.2f}".format(random.uniform(30.0,35.0))),
                    'Humid': float("{0:.2f}".format(random.uniform(40.0,60.0))),
                    'iHumid': -0.01,
                    'iTemp': 0.01,
                    'Latitude': latitude[idx],
                    'Line1':line1[idx],
                    'Line2':line2[idx],
                    'Longtitude': longtitude[idx],
                    'Pub': 0,
                    'Rest': 0,
                    'SSID_name': 'undefined',
                    'SSID_pass': 'undefined',
                    'Temperature': float("{0:.2f}".format(random.uniform(30.0,35.0))),
                    'Train': train_time[flag_idx],
                    'UnitName': unit_name[idx],
                    'Water': "1/2"
                }

        print(unit_name[idx], data['Flag'])

        curr_ref.update(data)
        log_ref.set(data)

    time.sleep(20)