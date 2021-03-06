from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS
import os.path
import json

app = Flask(__name__)
CORS(app)
api = Api(app)


#Used for login validation and retrieving data
class Login(Resource):
    def get(self, username, password):
        #Find file with name = Username
        filePath = "../UserFiles/"+username.upper()+".json"

        #if no file return nothing
        if( not os.path.exists(filePath)):
            return ({"msg":"No User"});

        #load file
        #check username
        #return json info
        with open(filePath, "r") as f:
            data = json.loads(f.read())
        #print(data["password"])

            if (data["password"] != password):
                return ({"msg":"Incorrect password"})

            return (data)

#Used for saving data
class Logout(Resource):
    def get(self, data):

        #check username in data
        jsonData = json.loads(data)
        if(not jsonData["username"]):
            return ({"msg":"Invalid User Data"})


        #read username into pathName
        filePath = "../UserFiles/"+jsonData["username"].upper()+".json"

        #else return json info
        with open(filePath, "w+") as f:
            f.write(json.dumps(jsonData, indent = 4))
            return ({"msg":"Success"});

class AddUser(Resource):
    def get(self, username, password):
        #Find file with name = Username
        filePath = "../UserFiles/"+username.upper()+".json"

        #if user already exists  return nothing
        if( os.path.exists(filePath)):
            return ({"msg":"Existing User"});


        with open("../UserFiles/default.json", "r") as f:
            basedata = json.loads(f.read())

        basedata["username"] = username
        basedata["password"] = password

        with open(filePath, "w+") as f:
            f.write(json.dumps(basedata, indent = 4))

            return (basedata)


api.add_resource(Login, '/login-<string:username>-<string:password>')
api.add_resource(Logout, '/logout-<string:data>')
api.add_resource(AddUser, '/adduser-<string:username>-<string:password>')


if __name__ == '__main__':
    app.run(debug=True)
