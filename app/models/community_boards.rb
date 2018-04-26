class CommunityBoards
  # add attribute readers for instance access
  attr_reader :id, :image, :description, :created, :updated

  # if heroku, use heroku psql db
  if (ENV['DATABASE_URL'])
    uri = URI.parse(ENV['DATABASE_URL'])
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  # else, use local psql db
  else
    DB = PG.connect(
      host: "localhost",
      port: 5432,
      dbname: 'dream_onward')
  end

  def initialize(opts)
    @id = opts["id"].to_i
    @image = opts["image"]
    @description = opts["description"]
    @created = opts["created"]
    @updated = opts["updated"]
  end

  # ==========
  # INDEX
  # ==========

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT * FROM community_boards
        ORDER BY updated DESC;
      SQL
    )

    # # 23 April 2018
    # return results.map do |result|
    #   CommunityBoardImage.new({
    #     "id" => result["id"],
    #     "image" => result["image"],
    #     "description" => result["description"]
    #   })
    # end

    # empty array, stores converted results
    community_boards = []

    # for each result, create a new_community_board
    results.each do |result|
      new_community_board = CommunityBoards.new({
        "id" => result["id"],
        "image" => result["image"],
        "description" => result["description"],
        "created" => result["created"],
        "updated" => result["updated"]
      })
      # push new_community_board to community_boards array
      community_boards.push(new_community_board)
    end

    # return community_boards array
    return community_boards
  end

  # ==========
  # SHOW
  # ==========

  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT * FROM community_boards
        WHERE id = #{id};
      SQL
    )

    # # 23 April 2018
    # return results.map do |result|
    #   CommunityBoardImage.new({
    #     "id" => result["id"],
    #     "image" => result["image"],
    #     "description" => result["description"]
    #   })
    # end

    # null community_board
    community_board = nil

    # for each result, create a new_community_board
    results.each do |result|
      new_community_board = CommunityBoards.new({
        "id" => result["id"],
        "image" => result["image"],
        "description" => result["description"],
        "created" => result["created"],
        "updated" => result["updated"]
      })
      community_board = new_community_board
    end

    # return community_board
    return community_board
  end

  # ==========
  # CREATE
  # ==========

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO community_boards (image, description, created, updated)
        VALUES ('#{opts["image"]}', '#{opts["description"]}', 'now()', 'now()')
        RETURNING id, image, description, created, updated;
      SQL
    )
    return CommunityBoards.new(results.first)
  end

  # ==========
  # DELETE
  # ==========

  def self.delete(id)
    results = DB.exec(
      <<-SQL
        DELETE FROM community_boards
        WHERE id = #{id};
      SQL
    )
    return {deleted: true}
  end

  # ==========
  # UPDATE
  # ==========

  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE community_boards
        SET
          image = '#{opts["image"]}',
          description = '#{opts["description"]}',
          updated = 'now()}'
        WHERE id = #{id}
        RETURNING id, image, description, created, updated;
      SQL
    )
    return CommunityBoards.new(results.first)
  end

end
