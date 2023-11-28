const api_server = process.env.API_SERVER;

class Api {
    async processRegistration(data: { phone: string; avatar: File; fullName: string; isDriver: boolean; isActive: boolean; isAdmin: boolean; password: string; latitude: number; longitude: number; }) {
        const response = await fetch(`${api_server}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }
    private token: string | null = null;

    async login(phone: string, password: string) {
        const response = await fetch(`${api_server}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }


        const data = await response.json();
        if (data.isAdmin === false) {
            throw new Error('You are not admin');
        }
        this.token = data.token;
    }
}
export default new Api();