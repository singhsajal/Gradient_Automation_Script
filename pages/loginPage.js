import BasePage from './basePage';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.usernameInput = '#username';
        this.passwordInput = '#password';
        this.loginButton = '#login';
        this.email = 'sajal@jasbhi.com';
        this.password = 'Focus@12345'

    }

    async login(username, password) {

        await this.page.getByPlaceholder('email').click();
        await this.page.getByPlaceholder('email').fill(username);
        await this.page.getByPlaceholder('password').click();
        await this.page.getByPlaceholder('password').fill(password)
        await this.page.getByPlaceholder('password').press('Enter');
        //await this.page.getByRole('button', { name: 'SIGN IN' }).click();
    }
    async validLogin() {

        await this.page.getByPlaceholder('email').click();
        await this.page.getByPlaceholder('email').fill(this.email);
        await this.page.getByPlaceholder('password').click();
        await this.page.getByPlaceholder('password').fill(this.password).press('Enter');
        await this.page.getByPlaceholder('password').press('Enter')
        // await this.page.getByRole('button', { name: 'SIGN IN' }).click();
    }
}



export default LoginPage;