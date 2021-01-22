import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const bodybuilder = require('bodybuilder');

const index = 'person';

@Injectable()
export class PersonsService {
  private readonly esClient: elasticsearch.Client;

  constructor() {
    this.esClient = new elasticsearch.Client({
      host: 'http://localhost:9200',
    });
    this.esClient.ping({ requestTimeout: 3000 }).catch(() => {
      throw new HttpException(
        {
          status: 'error',
          message: 'Unable to reach Elasticsearch cluster',
        },
        500,
      );
    });
  }

  // Combien de personnes sont des femmes ?
  public async findTotalWoman(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        query: {
          match: {
            gender: 'female',
          },
        },
      },
    });

    return response;
  }

  // Combien de personnes ont un age supérieur à 20 ans ?
  public async findPersonAboveAge20(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        query: {
          range: {
            age: {
              gte: 20,
            },
          },
        },
      },
    });

    return response;
  }

  // Combien d’hommes ont un age supérieur à 20 ans ?
  public async findManAboveAge20(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        query: {
          bool: {
            filter: [
              {
                range: {
                  age: {
                    gte: 20,
                  },
                },
              },
              {
                term: {
                  gender: 'male',
                },
              },
            ],
          },
        },
      },
    });

    return response;
  }

  // Retournez toutes les persnnes qui ont un age supérieur à 20 ans, et dont la balance est comprise entre $1000 et $2000.
  public async findPersonAboveAge20AndBalance(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        query: {
          bool: {
            filter: [
              {
                range: {
                  age: {
                    gte: 20,
                  },
                },
              },
              {
                range: {
                  balance: {
                    gte: 1000,
                    lte: 2000,
                  },
                },
              },
            ],
          },
        },
      },
    });

    return response;
  }

  // Trouvez toutes les personnes qui sont situées à moins de 10km de Paris.
  public async findPersonAroundParis(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        query: {
          bool: {
            must: {
              match_all: {},
            },
            filter: {
              geo_distance: {
                distance: '10km',
                location: {
                  lat: 48.8566,
                  lon: 2.3522,
                },
              },
            },
          },
        },
      },
    });

    return response;
  }

  // Calculer l’age moyen des personnes indexées
  public async calculateAverageAge(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        aggs: {
          avg_age: { avg: { field: 'age' } },
        },
      },
    });

    return response;
  }

  // Calculer le nombre de personnes par genre
  public async calculateTotalPersonPerGenre(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        aggs: {
          genres: {
            terms: {
              field: 'gender',
            },
          },
        },
      },
    });

    return response;
  }

  // Calculer le nombre de personnes par genre et par couleur des yeux
  public async calculateTotalPersonPerGenreAndEyeColor(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        aggs: {
          genres: {
            terms: {
              field: 'gender',
            },
            aggs: {
              eyeColor: {
                terms: {
                  field: 'eyeColor',
                },
              },
            },
          },
        },
      },
    });

    return response;
  }

  // Calculer le nombre de personnes par genre et par année d’enregistrement (propriété registered)
  public async calculateTotalPersonPerGenreAndYear(): Promise<any> {
    const response: any = await this.esClient.search({
      index,
      body: {
        aggs: {
          genres: {
            terms: {
              field: 'gender',
            },
            aggs: {
              registered: {
                terms: {
                  field: 'registered',
                  format: 'yyyy',
                },
              },
            },
          },
        },
      },
    });

    return response;
  }
}
