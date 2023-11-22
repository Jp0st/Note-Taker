const clog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    switch (req.method) {
        case 'GET': {
            console.info(`${fgCyan}${req.method} request received to retrieve a note`);
            break;
        } case 'POST': {
            console.info(`${fgCyan}${req.method} request received to add a note`);
            break;
        } default: {
            console.log(`${fgCyan}${req.method} request received`);
        }
    }
    next();
};

exports.clog = clog;