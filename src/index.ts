import App from './app';
import UrlController from './urls/urls.controller';
import { connectToDatabase } from './services/database.service';
import redirectController from './redirect/redirect.controller';

connectToDatabase().then(() => {
    const app = new App(
        [
            new redirectController(),
            new UrlController()
        ],
        3000
    );

    app.listen();
}).catch(() => {
    console.log('DB CONNECTION FAILED');
    process.exit();
})

// app.listen();