### Table: paygw_paypal

Stores PayPal related information for payments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the PayPal payment record.
- **paymentid**: `BIGINT(19)`, The ID of the payment this record is associated with.
- **pp_orderid**: `VARCHAR(255)`, The ID of the order in PayPal.

---

### Table: payment_accounts

Stores information about payment accounts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the payment account.
- **archived**: `BIT(1)`, Indicates if the account is archived. Default is 0.
- **context_id**: `BIGINT(19)`, Context ID associated with the payment account.
- **enabled**: `BIT(1)`, Indicates if the account is enabled. Default is 0.
- **id_number**: `VARCHAR(100)` (Nullable), ID number of the payment account.
- **name**: `VARCHAR(255)`, Name of the payment account.
- **created_at**: `BIGINT(19)` (Nullable), Timestamp of when the account was created.
- **updated_at**: `BIGINT(19)` (Nullable), Timestamp of the last modification of the account.

---

### Table: payment_gateways

Stores configuration for payment gateways for different payment accounts.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the payment gateway configuration.
- **account_id**: `BIGINT(19)`, The ID of the associated payment account.
- **config**: `LONGTEXT(2147483647)` (Nullable), Configuration settings for the payment gateway.
- **enabled**: `BIT(1)`, Indicates if the gateway is enabled. Default is 1.
- **gateway_name**: `VARCHAR(100)`, Name of the payment gateway.
- **created_at**: `BIGINT(19)`, Timestamp of when the gateway configuration was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the gateway configuration.

---

### Table: payments

Stores information about payments.

#### Fields

- **id**: `BIGINT(19)` (Primary Key), Unique identifier for the payment.
- **account_id**: `BIGINT(19)`, The ID of the associated payment account.
- **amount**: `VARCHAR(20)`, Amount of the payment.
- **component**: `VARCHAR(100)`, The plugin this payment belongs to.
- **currency**: `VARCHAR(3)`, Currency of the payment.
- **gateway**: `VARCHAR(100)`, The payment gateway used.
- **item_id**: `BIGINT(19)`, The ID of the item associated with the payment.
- **payment_area**: `VARCHAR(50)`, The name of the payable area.
- **created_at**: `BIGINT(19)`, Timestamp of when the payment was created.
- **updated_at**: `BIGINT(19)`, Timestamp of the last modification of the payment.
- **user_id**: `BIGINT(19)`, The ID of the user who made the payment.
