# microfrontend-angular-keycloak-example
## Part 1: Configure Keycloak
## Creating the realm
Create a new realm called `demo` (find the `add realm` button in the drop-down
   in the top-left corner).

## Create a client
1. Now create a client for the JS console by clicking on `clients` then `create`.

   Fill in the following values:

   * Client ID: `js-console`
   * Click `Save`

   On the next form fill in the following values:

   * Valid Redirect URIs: \
   `http://localhost:3000/*` \
   `http://localhost:3200/*` \
   `http://localhost:5000/*`
   * Web Origins:  
   `http://localhost:3000` \
   `http://localhost:3200` \
   `http://localhost:5000` \
   Enabled `PKCE`. See screenshot 3.
![Keycloak Client Configuration 1](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/1.png)
![Keycloak Client Configuration 2](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/2.png)
![Keycloak Client Configuration 3](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/3.png)

2. Once the client is created click on the Installation tab select `Keycloak OIDC JSON` for `Format Option`. Here you will see `auth-server-url`,`realm`. These will be needed later for keycloak configuration in angular app.
   ![Keycloak Client Installation](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/4.png)

## Part 2: Start Angular Applications
1. Move into mfe1 and install the dependencies with npm:
   ```
    cd mfe1
    npm i
    ```
2. Follow same steps for mfe2 & shell:
   ```
    cd mfe2
    npm i
    cd shell
    npm i
    ```
3. Open `environment.ts` file in your favorite IDE. Replace `url`, `realm`, `clientId` if they are different in your case. Here `url` is `auth-server-url`, `realm` is `realm` from Part 1.
4. Now run all angular applications (``ng serve``)
5. Go to (``http://localhost:3000``) to check `mfe1` has started.
   ![mfe1](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/5.png)
6. Go to (``http://localhost:3200``) to check `mfe2` has started.
   ![mfe2](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/6.png)
7. Go to (``http://localhost:5000``) to check `shell` has started.
   ![shell](https://github.com/nurhmaz/microfrontend-angular-keycloak-example/blob/main/7.png)
8. You will only need to sign in once to access `mfe1`,`mfe2`,`shell`

# How it works
1. For learning about microfrontend go here: \
   https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/tutorial/tutorial.md
2. For learning about keycloak integration in angular: \
   https://github.com/mauriciovigolo/keycloak-angular/blob/master/README.md
3. Go to (``http://localhost:5000``), log in to `shell` application via keycloak.
4. By default `user-profile` page of `mfe2` microfrontend application page is opened.
5. We don't have access to same session in either page of microfrontend application because those module behave like lazy module
6. To get same session we save `accessToken`,`idToken`,`refreshToken` using `ngrx`. We do this in `AppComponent` of `shell`. Another option is to save these tokens in `localStorage` or `sessionStorage`.
7. Then we initialize `KeycloakService` with `accessToken`,`idToken`,`refreshToken`
