from flask import Flask, render_template, request, redirect
import redis
import os


app = Flask(__name__)

# db = redis.from_url(os.environ["REDISCLOUD_URL"])


@app.route("/")
def calculadora_home():
    return render_template("index.html")


# para logear las operaciones a redis y volver a la misma página
# db.zadd("operaciones", {operacion})
# return redirect("/")
