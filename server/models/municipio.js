/**
 * Municipio model
 */

module.exports = function hotelRoomModel(we) {
  const model = {
    definition: {
      published: {
        type: we.db.Sequelize.BOOLEAN,
        defaultValue: false,
        formFieldType: null
      },
      highlighted: {
        type: we.db.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        formFieldType: null
      },
      name: {
        type: we.db.Sequelize.STRING,
        allowNull: false
      },
      about: {
        type: we.db.Sequelize.TEXT,
        allowNull: false,
        formFieldType: 'textarea',
      },
      body: {
        type: we.db.Sequelize.TEXT,
        allowNull: false,
        formFieldType: 'html',
        formFieldHeight: 400
      },
      publishedAt: {
        type: we.db.Sequelize.DATE,
        allowNull: true
      }
    },
    associations: {
      creator: {
        type: 'belongsTo',
        model: 'user'
      },
      cats: {
        type: 'belongsToMany',
        // as: 'Tasks',
        through: {
          model: 'modelsterms',
          unique: false,
          constraints: false,
          scope: {
            modelName: 'hotel-room'
          }
        },
        constraints: false,
        foreignKey: 'modelId',
        // otherKey: 'termId',
        //type: 'hasMay',
        model: 'term'
      },
      editors: {
        type: 'belongsToMany',
        model: 'user',
        through: 'municipiosEditors',
        inverse: 'municipiosEditorIn'
      }
    },
    options: {
      // title field, for default title record pages
      titleField: 'name',

      termFields: {
        tags: {
          vocabularyName: null,
          canCreate: true,
          formFieldMultiple: true,
          onlyLowercase: true
        },
        category: {
          vocabularyName: 'Category',
          canCreate: false,
          formFieldMultiple: false
        }
      },

      imageFields: {
        featuredImage: { formFieldMultiple: false },
        images: { formFieldMultiple: true }
      },

      // Class methods for use with: we.db.models.[yourmodel].[method]
      classMethods: {
        // suport to we.js url alias feature
        urlAlias(record) {
          return {
            alias: '/municipios/' + record.id + '-'+  we.utils
              .string( record.name )
              .slugify().s,
            target: '/municipio/' + record.id,
          };
        },
        /**
         * Context loader, preload current request record and related data
         *
         * @param  {Object}   req  express.js request
         * @param  {Object}   res  express.js response
         * @param  {Function} done callback
         */
        contextLoader(req, res, done) {
          if (!res.locals.id || !res.locals.loadCurrentRecord) return done();

          return this.findOne({
            where: { id: res.locals.id },
            include: [{ all: true }]
          })
          .then(function afterLoadContextRecord (record) {
            res.locals.data = record;

            if (record && record.dataValues.creatorId && req.isAuthenticated()) {
              // ser role owner
              if (record.isOwner(req.user.id)) {
                if(req.userRoleNames.indexOf('owner') == -1 ) req.userRoleNames.push('owner');
              }
            }

            if (record.editors && req.isAuthenticated()) {
              const ed = record.editors;
              for (let i = ed.length - 1; i >= 0; i--) {
                if (ed[i].id == req.user.id) {
                  req.userRoleNames.push('owner');
                  break;
                }
              }
            }

            done();
            return null;
          })
          .catch(done);
        }

      },
      // record method for use with record.[method]
      instanceMethods: {},
      hooks: {
        beforeCreate(r) {
          // create an published content and set its publishedDate:
          if (r.published) {
            r.publishedAt = Date.now();
          }
        },

        beforeUpdate(r) {
          if (r.published && !r.publishedAt) {
            // set publishedAt on publish:
            r.publishedAt = Date.now();
          } else if (!r.published && r.publishedAt) {
            // reset publishedAt on unpublish
            r.publishedAt = null;
          }
        }
      }
    }
  };

  return model;
};
