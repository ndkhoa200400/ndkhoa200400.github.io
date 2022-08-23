import json

base_link = "./data/payment-method/"


links = [base_link + "NLCM-payment-method.json",
         base_link + "VLG-payment-method.json",
         base_link + "VLTKH5-payment-method.json"]

product_payments = []

unique_id = {}
for link in links:
    f = open(link)
    data = json.load(f)

    for product_payment in data.keys():
        print(product_payment)

        if product_payment not in unique_id:
            unique_id[product_payment] = True
            p = data[product_payment]
            product_payments.append({
                "_id": int(p['id']),
                "name": p['name'],
                "type": p['type'],
                "desc": p['desc']
            })

    f.close()

print(product_payments)

writer = open("product_payments.json", "w")
writer.write(str(product_payments).replace('\'', '\"'))

writer.close()
