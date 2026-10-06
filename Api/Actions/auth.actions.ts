'use server'

import { LoginValues } from '@/app/(auth)/login/page';
import type { FormValues } from '@/app/(auth)/register/page';
import { cookies } from 'next/headers';

export async function userRegister({ terms, ...body }: FormValues) {
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        const payload = await response.json();

        if (!response.ok) {
            console.log('Signup API error:', response.status, payload); 
            return { success: false, message: payload.message || 'Signup failed' };
        }

        return { success: true, message: 'Account created successfully' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Network error, please try again' };
    }
}


// export async function userLogin({  ...body }: LoginValues) {
//     try {
//         const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
//             method: 'POST',
//             body: JSON.stringify(body),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         const payload = await response.json();

//         if (!response.ok) {
//             console.log('Signin API error:', response.status, payload); 
//             return { success: false, message: payload.message || 'Signin failed' };
//         }
//         if(response.ok){
//             const cookie = await cookies()
//             cookie.set('userToken',payload.token,{
//                 httpOnly:true,
                
//             })
//         }

//         return { success: true, message: 'Loggedin successfully' };
//     } catch (error) {
//         console.log(error);
//         return { success: false, message: 'Network error, please try again' };
//     }
// }