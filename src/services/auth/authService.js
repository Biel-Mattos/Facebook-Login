export const authService = {
    async login({name,password}) {
        return fetch('http://localhost:4000/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name,
                password
            })
        })
        .then(async (respostadoServidor) => {
            if(!respostadoServidor.ok) throw new Error('usuário não encontrado')
            const body = await respostadoServidor.json();
            console.log(body);
        })
    }
}