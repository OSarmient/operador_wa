<template>
    <section>
        <h1>Bienvenido, {{ username }}!</h1>
        <button class="logout-button" @click="logout">Cerrar sesión</button>
    </section>

</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Nav',
        data() {
            return {
                username: '',
            };
        },
        mounted(){
            this.username = window.localStorage.getItem('username');
        },
        methods:{
            async logout() {
        
                try {
                
                const token = window.localStorage.getItem('token');
                const username = window.localStorage.getItem('username');
                
                // Preparar el cuerpo de la petición con el token y el nombre de usuario
                const requestBody = {
                    auth_token: token,
                    username,
                };

                // Enviar petición al backend para cerrar sesión
                await axios.post('http://localhost:8000/logOut', requestBody);
                console.log('Cerrando sesión...');
                // Eliminar el token del almacenamiento local y redirigir al usuario a la página de inicio de sesión
                window.localStorage.removeItem('token');
                this.$router.push('/login');
                } catch (error) {
                console.error('Error al cerrar sesión:', error);
                }
            },
        }
    }
</script>

<style scoped>
    section {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        padding: .5rem;
        border-bottom: 1px solid #ccc;
    }

    h1 {
        margin-left: 1rem;
    }
    .logout-button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        color: #fff;
        background-color: #dc3545;
        border: 1px solid #dc3545;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 1rem;
    }
</style>