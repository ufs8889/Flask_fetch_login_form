import bcrypt
import sqlite3
import uuid

class Database:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connection = None

    def connect(self):
        self.connection = sqlite3.connect(self.db_name)

    def disconnect(self):
        if self.connection:
            self.connection.close()

    def create_table(self, table_name, columns):
        query = f"CREATE TABLE IF NOT EXISTS {table_name} ({', '.join(columns)})"
        self.execute_query(query)

    def insert_data(self, table_name, data):
        columns = ', '.join(data.keys())
        placeholders = ', '.join(['?' for _ in data.keys()])
        query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
        self.execute_query(query, tuple(data.values()))

    def update_data(self, table_name, data, condition):
        set_values = ', '.join([f"{column} = ?" for column in data.keys()])
        query = f"UPDATE {table_name} SET {set_values} WHERE {condition}"
        self.execute_query(query, tuple(data.values()))

    def delete_data(self, table_name, condition):
        query = f"DELETE FROM {table_name} WHERE {condition}"
        self.execute_query(query)

    def select_data(self, table_name, condition=None):
        query = f"SELECT * FROM {table_name}"
        if condition:
            query += f" WHERE {condition}"
        return self.execute_query(query, fetch=True)

    def execute_query(self, query, data=None, fetch=False):
        cursor = self.connection.cursor()
        if data:
            cursor.execute(query, data)
        else:
            cursor.execute(query)
        self.connection.commit()
        if fetch:
            return cursor.fetchall()


    

# Usage example
database_name = "mydatabase.db"
db = Database(database_name)
db.connect()

#table_name = "employees"
#columns = [
#    "id INTEGER PRIMARY KEY AUTOINCREMENT",
#    "name TEXT NOT NULL",
#    "age INTEGER NOT NULL",
#    "position TEXT NOT NULL"
#]

#table_name = "Users"
#columns = [
#    "user_ID TEXT",
#    "Username TEXT",
#    "Phone Number TEXT",
#    "Email TEXT",
#    "Hashed_passswd TEXT",
#]
#db.create_table(table_name, columns)

data = {
    "name": "John Doe",
    "age": 780,
    "position": "Manager"
}
#db.insert_data(table_name, data)

update_data = {
    "name": "Jane Smith",
    "age": 35,
    "position": "Director"
}
condition = "id = 1"
#db.update_data(table_name, update_data, condition)

delete_condition = "id = 2"
#db.delete_data(table_name, delete_condition)

#select_condition = "name > 35"
#result = db.select_data(table_name, select_condition)
#print([(item[1], item[0]) for item in result]) # for x in range(len(reult))

#db.login("John Doe",1)
# Disconnect from the database
#db.disconnect()

class User:
    def __init__(self, Username, Phone_Number, Email, Hashed_passswd):
        self.Username = Username
        self.Phone_Number = Phone_Number
        self.Email = Email
        self.Hashed_passswd = Hashed_passswd
    


    def check_username_exists(self):
        # Check if the username already exists in the database
        conn = sqlite3.connect('mydatabase.db')
        cursor = conn.cursor()
        cursor.execute("SELECT Username FROM Users WHERE Username=?", (self.Username,))
        row = cursor.fetchone()
        conn.close()

        if row:
            return True
        else:
            return False


    def check_Phone_number_exists(self):
        # Check if the username already exists in the database
        conn = sqlite3.connect('mydatabase.db')
        cursor = conn.cursor()
        cursor.execute("SELECT Username FROM Users WHERE Phone=?", (self.Phone_Number,))
        row = cursor.fetchone()
        conn.close()

        if row:
            return True
        else:
            return False

    def register(self):
        # Check if the username already exists
        if self.check_username_exists():
            print("Username already exists. Please choose a different username.")
            return "Username_exist"
        if self.check_Phone_number_exists():
            print("This number already exists!!!. Please choose a different number.")
            return "Number_exist"

        # Hash the password
        user_ID = str(uuid.uuid4())
        hashed_password = bcrypt.hashpw(self.Hashed_passswd.encode('utf-8'), bcrypt.gensalt())

        # Store the username, phone number, email, and hashed password in the database
        conn = sqlite3.connect('mydatabase.db')
        cursor = conn.cursor()
        cursor.execute("INSERT INTO Users (user_ID, Username, Phone, Email, Hashed_passswd) VALUES (?, ?, ?, ?, ?)",
                       (user_ID, self.Username, self.Phone_Number, self.Email, hashed_password))
        conn.commit()
        conn.close()
        return user_ID

    def login(self):
        # Retrieve the stored hashed password from the database
        conn = sqlite3.connect('mydatabase.db')
        cursor = conn.cursor()
        cursor.execute("SELECT Hashed_passswd, user_ID FROM Users WHERE Username=?", (self.Username,))
        #cursor.execute("SELECT Hashed_passswd FROM Users WHERE Username=?", (self.Username,))
        row = cursor.fetchone()
        conn.close()

        if row:
            stored_hashed_password = row[0]
            # Compare the entered password with the stored hashed password
            if bcrypt.checkpw(self.Hashed_passswd.encode('utf-8'), stored_hashed_password):
                print("Login successful!")
                return [True, row[1]]
            else:
                print("Login failed!")
                return "Credentials are incorect!"
        else:
            print("User not found!")
            return "User not found!"

    def delete_user(self):
        # Delete the user from the database
        conn = sqlite3.connect('mydatabase.db')
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Users WHERE Username=?", (self.Username,))
        conn.commit()
        conn.close()



# Register a user
user = User("john", "+998909715620", "axs@mail.com", "password123")
#user.register()

user_login = User("john", "", "", "password123")
#user_login.login()

user = User("john_doe", "1234567890", "john_doe@example.com", "old_password")
#user.update_user(new_password="new_password")




def update_user(user_ID=None, new_username=None, new_phone=None, new_email=None, new_password=None):
        # Update the user's information in the database
        conn = sqlite3.connect('mydatabase.db')
        cursor = conn.cursor()

        if new_username:
            cursor.execute("UPDATE Users SET Username=? WHERE user_ID=?", (new_username, user_ID))
            Username = new_username

        if new_phone:
            cursor.execute("UPDATE Users SET Phone=? WHERE user_ID=?", (new_phone, user_ID))
            Phone_Number = new_phone

        if new_email:
            cursor.execute("UPDATE Users SET Email=? WHERE user_ID=?", (new_email, user_ID))
            Email = new_email

        if new_password:
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            cursor.execute("UPDATE Users SET Hashed_passswd=? WHERE user_ID=?", (hashed_password, user_ID))
            Hashed_passswd = hashed_password
        conn.commit()
        conn.close()
        return True

# Example usage:
#update_user(user_ID=1, new_username="NewUsername", new_phone="NewPhoneNumber", new_email="NewEmail")



def remembered_login(token=None,username=None):
    # Check if the username already exists in the database
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    if token:
     cursor.execute("SELECT username FROM Users WHERE user_ID=?", (token,))
    if username: 
     cursor.execute("SELECT user_ID FROM Users WHERE username=?", (username,))
    row = cursor.fetchone()
    conn.close()
    #print(row)
    if row:
        return [True,''.join(row)]
    else:
        return False 


def check_Phone_number_exists(Phone_number):
    # Check if the username already exists in the database
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    cursor.execute("SELECT Username FROM Users WHERE Phone=?", (Phone_number,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return True
    else:
        return False

def check_username_exists(username):
    # Check if the username already exists in the database
    conn = sqlite3.connect('mydatabase.db')
    cursor = conn.cursor()
    cursor.execute("SELECT Username FROM Users WHERE Username=?", (username,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return True
    else:
        return False


#print(remembered_login("4b8b8842-d3e7-41d3-963b-a7d45a469ebc"))



    # Retrieve the stored hashed password from the database
       