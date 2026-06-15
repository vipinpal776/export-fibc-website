from flask import Flask, render_template

app = Flask(__name__)


@app.context_processor
def inject_site_data():
    return {
        "company_name": "Export FIBC Bags",
        "company_tagline": "Global FIBC Sourcing & Export Support",
        "email": "vipinpaloffice@gmail.com",
        "phone": "+91 7905677389",
    }


@app.route("/")
def home():
    return render_template("index.html", active_page="home")


@app.route("/about")
def about():
    return render_template("about.html", active_page="about")


@app.route("/products")
def products():
    return render_template("products.html", active_page="products")


@app.route("/bagweight")
def bagweight():
    return render_template("bagweight.html", active_page="bagweight")


@app.route("/contact")
def contact():
    return render_template("contact.html", active_page="contact")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False, use_reloader=False)
