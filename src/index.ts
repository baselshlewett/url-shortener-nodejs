import App from './app';
import UrlController from './urls/urls.controller';
import { connectToDatabase } from './services/database.service';
import RedirectController from './redirect/redirect.controller';

connectToDatabase().then(() => {
    const app = new App(
        [
            new RedirectController(),
            new UrlController()
        ],
        3000
    );

    app.listen();
}).catch(() => {
    process.exit();
})

// app.listen();