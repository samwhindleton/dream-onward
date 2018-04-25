class CommunityBoardImage
  attr_reader :id, :image, :description
  DB = PG.connect(host: 'localhost', port: 5432, dbname: 'dream_onward')

  def initialize(opts)
    @id = opts["id"].to_i
    @image = opts["image"]
    @description = opts["description"]
  end

  # ==========
  # INDEX
  # ==========

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT * FROM community_board;
      SQL
    )
    return results.map do |result|
      CommunityBoardImage.new({
        "id" => result["id"],
        "image" => result["image"],
        "description" => result["description"]
      })
    end
  end

  # ==========
  # SHOW
  # ==========

  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT * FROM community_board
        WHERE id = #{id};
      SQL
    )
    return results.map do |result|
      CommunityBoardImage.new({
        "id" => result["id"],
        "image" => result["image"],
        "description" => result["description"]
      })
    end
  end

  # ==========
  # CREATE
  # ==========

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO community_board (image, description)
        VALUES ('#{opts["image"]}', '#{opts["description"]}')
        RETURNING id, image, description;
      SQL
    )
    return CommunityBoardImage.new(results.first)
  end

  # ==========
  # DELETE
  # ==========

  def self.delete(id)
    results = DB.exec(
      <<-SQL
        DELETE FROM community_board
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
        UPDATE community_board
        SET
          image = '#{opts["image"]}',
          description = '#{opts["description"]}'
        WHERE id = #{id}
        RETURNING id, image, description;
      SQL
    )
    return CommunityBoardImage.new(results.first)
  end

end
