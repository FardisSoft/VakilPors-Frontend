import axios from 'axios';
import { LoginUser, updateUser } from './userService'; // adjust this import to your file structure

jest.mock('axios');

describe('API tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('LoginUser makes POST request', async () => {
        const data = { username: 'test', password: 'test' };
        axios.post.mockResolvedValue({ data });

        const response = await LoginUser(data);
        expect(response.data).toEqual(data);
        expect(axios.post).toHaveBeenCalledWith('https://api.fardissoft.ir/Auth/login', data);
    });

    it('updateUser makes PUT request', async () => {
        const data = { id: 1, name: 'test' };
        axios.put.mockResolvedValue({ data });

        const response = await updateUser(data);
        expect(response.data).toEqual(data);
        expect(axios.put).toHaveBeenCalledWith('https://api.fardissoft.ir/Customer/UpdateUser', data);
    });

    // Add similar tests for updateLawyer, deleteUser, getAlllawyer, getlawyer
});
