const faunadb = require('faunadb');

class Fauna {
  constructor({ secret }) {
    this.secret = secret;
    this.client = new faunadb.Client({ secret });
    this.q = faunadb.query;
  }

  /**
   * Create new collection
   *
   * @param name
   * @returns {Promise}
   */
  createCollection(name) {
    return this.client.query(this.q.CreateCollection({ name }));
  }

  /**
   * Create new index
   *
   * @param collection
   * @param name
   * @param terms
   * @param unique
   * @returns {Promise}
   */
  createIndex(collection, name, terms, unique) {
    const params = {
      name,
      source: this.q.Collection(collection),
    };

    if (terms) {
      params.terms = terms;
    }

    if (unique === true) {
      params.unique = true;
    }

    return this.client.query(this.q.CreateIndex(params));
  }

  /**
   * Create new document
   *
   * @param collection
   * @param data
   * @returns {Promise}
   */
  createDocument(collection, data) {
    return this.client.query(
      this.q.Create(this.q.Collection(collection), { data })
    );
  }

  /**
   * Retrieve document(s)
   * @param index
   * @param value
   * @returns {Promise}
   */
  async retrieveDocument(index, value) {
    const match = this._matchDocument(index, value);

    const exists = await this.client.query(this.q.Exists(match));

    if (exists === true) {
      return this.client.query(this.q.Get(match));
    }

    return null;
  }

  /**
   * Retrieve documents count
   *
   * @param index
   * @param value
   * @returns {Promise}
   */
  getDocumentsCount(index, value) {
    return this.client.query(this.q.Count(this._matchDocument(index, value)));
  }

  /**
   * Helper to search documents on specific index
   *
   * @param index
   * @param value
   * @returns {*}
   * @private
   */
  _matchDocument(index, value) {
    return this.q.Match(this.q.Index(index), value);
  }
}

module.exports = Fauna;
