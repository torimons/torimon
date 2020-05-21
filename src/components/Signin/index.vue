<template>
<v-app>
    <v-container fill-height>
        <v-row no-gutters justify="center">
        <v-col
            cols="12"
            sm="10"
            md="8"
            lg="6"
        >
        <v-card
            outlined
        >
            <v-card-title>
                <h2>Sign in</h2>
            </v-card-title>
            <v-form class="ma-4">
                <v-text-field
                    v-model="username"
                    label="Username"
                    prepend-icon="person"
                    dense
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    prepend-icon="lock"
                    type="password"
                    dense
                />
                <v-btn
                    color="lime"
                    depressed
                    block
                >
                Sign in
                </v-btn>
            </v-form>
            <v-divider></v-divider>
            <v-card-text>
            You don't have an account?
            <router-link to="/signup">Create account now!</router-link>
            </v-card-text>
        </v-card>
        </v-col>
        </v-row>
    </v-container>
</v-app>
</template>

<script lang="ts" src='./index.ts'>

<!-- Add "scoped" attribute to limit CSS to this component only -->
