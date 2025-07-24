use std::collections::HashSet;
// use ic_cdk::storage;

type Address = String;

#[derive(Default)]
struct State {
    accounts: HashSet<Address>,
}

thread_local! {
    static STATE: std::cell::RefCell<State> = std::cell::RefCell::new(State::default());
}

// #[ic_cdk::update]
pub fn create_account(address: String) -> String {
    STATE.with(|s| {
        let mut state = s.borrow_mut();
        if state.accounts.contains(&address) {
            return "Already exists".into();
        } else {
            state.accounts.insert(address);
            return "Account created".into();
        }
    })
}

pub fn get_accounts() -> Vec<String> {
    STATE.with(|s| {
        s.borrow().accounts.iter().cloned().collect()
    })
}
