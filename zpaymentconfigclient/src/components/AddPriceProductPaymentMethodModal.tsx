import { Form, InputNumber, Modal, Select, Switch } from "antd";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAddProductPricing, IProvider } from "types/type";
import { callAPI, getAvailableProvidersForProduct } from "utils/api-hepler";

export interface AddPriceConfigToProductPaymentMethodProps {
  showAddProviderModal: boolean;
  setShowAddProviderModal;
  onAddProvider;
}
const { Option } = Select;

export const AddPriceConfigToProductPaymentMethodModal: FC<
  AddPriceConfigToProductPaymentMethodProps
> = ({ showAddProviderModal, setShowAddProviderModal, onAddProvider }) => {
  const [providerForm] = Form.useForm<IAddProductPricing>();
  const [providers, setProviders] = useState<IProvider[]>();
  const params = useParams();

  const { appId, productID } = params;

  useEffect(() => {
    if (appId && productID)
      callAPI(
        getAvailableProvidersForProduct,
        [appId, productID],
        setProviders
      );
  }, [appId, productID]);

  return (
    <Modal
      title="Thêm nhà cung cấp"
      visible={showAddProviderModal}
      onOk={() => providerForm.submit()}
      onCancel={() => {
        setShowAddProviderModal(false);
      }}
    >
      <Form layout="vertical" form={providerForm} onFinish={onAddProvider}>
        <Form.Item label="ID nhà cung cấp" name="provideId">
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0 ||
              option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {providers?.map((p) => (
              <Option key={p.provideId} value={p.provideId}>
                {p.provideName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Số tiền" name="amount">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Trạng thái" name="enable">
          <div className="text-left">
            <Switch
              onChange={(e) => {
                providerForm.setFieldsValue({
                  enable: e,
                });
              }}
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
