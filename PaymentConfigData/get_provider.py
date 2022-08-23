import json

base_link = "./data/payment-method/"


links = [base_link + "NLCM-payment-method.json",
         base_link + "VLG-payment-method.json",
         base_link + "VLTKH5-payment-method.json"]

providers = []

unique_id = {}
for link in links:
    f = open(link)
    data = json.load(f)

    for product_payment in data.keys():
        print(product_payment)

        print(data[product_payment]["paymentMethods"])
        for provider in data[product_payment]["paymentMethods"]:
            if provider['provideId'] not in unique_id:
                unique_id[provider['provideId']] = True
                providers.append({
                    "_id": provider['provideId'],
                    "desc": provider['desc'],
                    "provide_name": provider['provideName']
                })

    f.close()
print(providers)
writer = open("providers.json", "w")
writer.write(str(providers).replace('\'', '\"'))

writer.close()
