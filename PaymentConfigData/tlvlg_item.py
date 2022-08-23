

import json


link = './data/item-info/VLG-item-info.json'

f = open(link)

data = json.load(f)


groups = []
for group in data.keys():
    print(group)
    _gr = {}
    _gr['app_id'] = 65640
    _gr['group_id'] = group
    _gr['group_name'] = data[group]['groupName']
    products = {}
    for product_key in data[group]['products']:
        _p = {}
        _p['description'] = data[group]['products'][product_key]['description']
        _p['enable'] = True
        _p['group_id'] = group
        if 'iapImage' in data[group]['products'][product_key]:
            _p['iap_image'] = data[group]['products'][product_key]['iapImage']
        _p['image'] = data[group]['products'][product_key]['image']
        _p['instruction'] = data[group]['products'][product_key]['instruction']
        if 'name' in data[group]['products'][product_key]:
            _p['product_name'] = data[group]['products'][product_key]['name']
        else:
            _p['name'] = ''
        _p['product_id'] = int(product_key)
        prices_key = data[group]['products'][product_key]['prices']
        for price_key in prices_key:
            for provide_id in prices_key[price_key]:
                _p['price'] = prices_key[price_key][provide_id]
                break
            break
        products[product_key] = _p
    _gr['products'] = products
    groups.append(_gr)
print(groups)

writer = open("vlg_item.json", "w")
writer.write(str(groups).replace('\'', '\"').replace('True', 'true'))

writer.close()
