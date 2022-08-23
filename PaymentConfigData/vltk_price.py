

import json


link = './data/item-info/VLTKH5-item-info.json'
link2 = './data/payment-method/VLTKH5-payment-method.json'

f = open(link)
f2 = open(link2)
item_info_data = json.load(f)
payment_method_data = json.load(f2)

data = []
app_id = 59012
for group in item_info_data.keys():

    for product_key in item_info_data[group]['products']:
        prices = item_info_data[group]['products'][product_key]['prices']
        print(prices)
        for payment_method in prices.keys():
            # print("\t", payment_method)
            _p = {}
            _p['app_id'] = app_id
            _p['group_id'] = group

            if payment_method == 'sms':
                _p['method_id'] = 0
            elif payment_method == 'card':
                _p['method_id'] = 1
            elif payment_method == 'bank':
                _p['method_id'] = 2
            elif payment_method == 'credit':
                _p['method_id'] = 3
            elif payment_method == 'e-wallet':
                _p['method_id'] = 4
            elif payment_method == 'google-play':
                _p['method_id'] = 5
            _p['product_id'] = int(product_key)
            _p['order'] = payment_method_data[payment_method]['order']
            _p['display_conditions'] = payment_method_data[payment_method]['displayConditions']
            _p['enable'] = True if payment_method_data[payment_method]['enable'] == 1 else False

            payment_methods = []

            for provide_id in prices[payment_method]:
                provider = {}
                provider['provide_id'] = provide_id
                provider['amount'] = prices[payment_method][provide_id]
                provider['enable'] = True
                payment_methods.append(provider)

            _p['payment_methods'] = payment_methods
         
            data.append(_p)


f.close()

f2.close()

writer = open("vltk_product_payment_methods.json", "w")

writer.write(str(data).replace('\'', '\"').replace('True', 'true'))

writer.close()


