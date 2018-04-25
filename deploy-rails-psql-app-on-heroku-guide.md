# Heroku Deployment

##### How to deploy an **existing** repo to an **existing** Heroku app & Heroku database setup.

### Follow below steps if you have:

1. A [Rails](http://rubyonrails.org/) and [PostgreSQL](https://www.postgresql.org/) app.

2. The repo on [GitHub](https://github.com/).

3. An app on [Heroku](heroku.com).

### Connect Repo to Heroku

#### Heroku Dashboard

* In a browser go to your [Heroku Dashboard](https://dashboard.heroku.com/apps)

  * Login if required.

* Select your app.

  ![heroku-dashboard](/images/heroku-deploy/heroku-dashboard.png)

* Select the **Resources** tab.

  * If you see <span style="color:red">`Heroku Postgres :: Database`</span> go to step <span style="color:red">`Select the Deploy tab`</span>.

  ![resources](/images/heroku-deploy/resources.png)

  * Else: Type <span style="color:red">`postgres`</span> in the **Add-ons** field and select <span style="color:red">`Heroku Postgres`</span>

  ![add-postgres](/images/heroku-deploy/add-postgres.png)

* Select the **Deploy** tab.

  ![deploy](/images/heroku-deploy/deploy.png)

* Scroll to the bottom of the page, you'll need the name of your heroku app repo.  
  This might be different than the name of your github repo.

  ![heroku-app-repo](/images/heroku-deploy/heroku-app-repo.png)

#### Terminal

* Connect local repo to existing Heroku app. <span style="color:red">**DO NOT TYPE <span style="color:black">$</span>**</span>

  ```
  $ heroku git:remote -a foobar
  ```

* Push to Heroku

  ```
  $ git push heroku master
  ```

### Heroku Database(PostgreSQL) Setup

#### Terminal

* Connect to your Heroku App database

  ```
  $ heroku pg:psql
  ```

  * You'll see something similar to:

  ![heroku-db](/images/heroku-deploy/heroku-db.png)

* Create tables, populate data, etc.  
  Example:

  ```sql
  -- create a table
  CREATE TABLE foobar (id SERIAL, foo VARCHAR(24), bar TEXT);

  -- add data
  INSERT INTO foobar (foo, bar) VALUES
  ('tomato', 'is it a fruit or vegetable?'),
  ('pear', 'so many pears to chose from.'),
  ('apple', 'honeycrisp apples are my favorite.');
  ```

#### Rails Files

* Open a rails model file from the app/models directory

  ```
  $ app/models/foobar.rb
  ```

  ![directory](/images/heroku-deploy/directory.png)


* Edit the database connection  
  You'll need to do this for every model.

  ```ruby
  class Foobar
    attr_reader :id, :foo, :bar

    # if heroku, use heroku psql db
    # --------------------------------------------------
    # if statement shouldn't require change
    if (ENV['DATABASE_URL'])
      uri = URI.parse(ENV['DATABASE_URL'])
      DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    # --------------------------------------------------

    # else, use local psql db
    else
      DB = PG.connect(
        host: "localhost",
        port: 5432,
        dbname: 'foobar')
    end

    def initialize(opts = {})
      @id = opts["id"].to_i
      @foo = opts["foo"]
      @bar = opts["bar"]
    end

    # CODE HERE
    # ...
    # ...

  end
  ```

---

*  <span style="color:red">`git push`</span> to github and heroku.

* You can now user your local database while developing, and heroku will use its database on production.

### Done.
