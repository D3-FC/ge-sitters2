export default class Handler {

  static handle(err: any, req: any, res: any, next: any) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log('req.app.get(\'env\')', req.app.get('env'))

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }

}
