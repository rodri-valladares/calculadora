from flask import Flask, render_template, request, redirect
import redis
import os


app = Flask(__name__)

db = redis.from_url(os.environ["REDISCLOUD_URL"])

def registrar_calculo(calculo):
    db.rpush("registro", calculo)
    return calculo

def obtener_calculos():
    calculos = db.lrange("registro", 0, -1)
    for i,calculo in enumerate(calculos):
        calculos[i]=calculos[i].decode("UTF-8")
    return {"calculos":calculos}


@app.route("/")
def calculadora_home():
    return render_template("index.html")

@app.route("/calculos", methods=["POST","GET"])
def calculos():
    if request.method=="POST":
        return registrar_calculo(request.get_json()["calculo"]) 

    elif request.method=="GET":
        return obtener_calculos()

    



