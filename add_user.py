import firebase_admin
from firebase_admin import credentials, db
import datetime
import time
import random

cred = credentials.Certificate('serviceAccountKey.json')
firebase_default_app = firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://humidtemp-59706.firebaseio.com/'
})

firebase_ref = db.reference('/')
curr_ref = firebase_ref.child('User/')
data = {
            "1": "1"
        }
curr_ref.update(data)