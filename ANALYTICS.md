
# Explorer Analytics

This page lists [Google Analytics custom events](https://developers.google.com/analytics/devguides/collection/gtagjs/events) reported by Explorer.

| `action`             | `event_category`                                                                            | `event_label`                                 | Reported each time…                        |
|----------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------|--------------------------------------------|
| `page_view`          | [recommended](https://developers.google.com/tag-platform/gtagjs/reference/events#page_view) |                                               | … user navigates in Explorer               |
| `search`             | [recommended](https://developers.google.com/tag-platform/gtagjs/reference/events#search)    |                                               | … user activates `Search Bar`              |
| `connect`            | `wallet`                                                                                    | {walletName}                                  | … user connects to wallet {walletName}     |
| `connection_failure` | `wallet`                                                                                    | {walletName}                                  | … connection to {walletName} fails         |
| `associate_token`    | `transaction`                                                                               |                                               | … user associates a token to an account    |
| `dissociate_token`   | `transaction`                                                                               |                                               | … user dissociates a token from an account |
| `change_staking`     | `transaction`                                                                               |                                               | … user change/stop staking for an account  |
| `verify_contract`    | `contract`                                                                                  | `Full Match`<br>`Partial Match`<br>`Mismatch` | … user verifies a contract                 |

> Note 1: events above are sent when
> 1) `VITE_APP_GOOGLE_TAG_ID` is setup in `.env` file
> 2) User has given her agreement to cookie usage

> Note 2: table above list events that are **explicitly** sent by Explorer.<br>
> `gtag()` function may send other events when [Enhanced Measurement Events](https://support.google.com/analytics/answer/9216061) are enabled in GA account.
