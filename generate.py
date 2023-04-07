from faker import Faker
import math
from random import random

inserts_no = 10
batches_no = 10
fake = Faker(False)

file = open('sql_script.sql', 'w')

for i in range(inserts_no):
	file.write('INSERT INTO client(id,address,birth_date,email,name,telephone_number) VALUES ')
	for j in range(batches_no):
		file.write(f'({i * batches_no + j + 1},\'{fake.address()}\',\'{fake.date_time().strftime("%d-%m-%Y")}\','+
		f'\'{fake.email(False)}\',\'{fake.name()}\',\'{fake.phone_number()}\')'+
		"," if j < batches_no - 1 else ");")
		
file.close()