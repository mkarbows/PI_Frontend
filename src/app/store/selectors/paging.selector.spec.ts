import * as fromPaging from './paging.selector';
import {
  MediaThumbnails,
  DrawingThumbnails,
  SpecificationThumbnails
} from 'src/app/shared/models/itemthumbnails.model';
import {
  MediaThumbnailItem,
  DrawingThumbnailItem,
  SpecificationThumbnailItem
} from 'src/app/shared/models/item.model';

describe('Paging selectors', () => {
  const drawingItems: DrawingThumbnails = {
    data: [
      {
        sheet_type: null,
        sheet_type_id: null,
        drawing_number: 'RFI-T2.0A-S6.101',
        title: 'T2 - PH0A - STRUCTURAL - FOUNDATION DETAILS',
        geodata: {
          segment: [],
          terminal: []
        },
        level_number: null,
        phase: null,
        discipline: ['Telecommunications'],
        time: new Date(),
        url_endpoint: 'progress_rfi-t2-0a-s6-101',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: '0T2-S2.201',
        title:
          'PH0 - T2 - STRUCTURAL - FOUNDATION PLAN - LEVEL 01 ARRIVALS - OVERALL',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L1',
        phase: null,
        discipline: ['Structural'],
        time: new Date(),
        url_endpoint: 'progress_t2t2-s2-201',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Elevation',
        sheet_type_id: '7',
        drawing_number: 'T2.0R-M7.000',
        title: 'T2 - PH0R - MECHANICAL HVAC CONTROLS',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m7-000',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: null,
        sheet_type_id: null,
        drawing_number: 'MTD-M6.102',
        title: 'T2_T3 - MECHANICAL DETAILS',
        geodata: {
          segment: [],
          terminal: null
        },
        level_number: null,
        phase: null,
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_mtd-m6-102',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: null,
        sheet_type_id: null,
        drawing_number: 'T2.0R-M0.002',
        title: 'T2 - PH0R - MECHANICAL progress SUMMARY',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m0-002',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Diagram',
        sheet_type_id: '8',
        drawing_number: 'T2.0R-M8.002',
        title: 'T2 - PH0R - MECHANICAL DETAILS',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m8-002',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Schedule',
        sheet_type_id: '1',
        drawing_number: 'T2.0R-M1.000',
        title: 'T2 - PH0R - MECHANICAL HVAC NEW SCHEDULES',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m1-000',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Enlarged Plan',
        sheet_type_id: '3',
        drawing_number: 'T2.0R-MD3.203-C3',
        title:
          'T2 - PH0R - MECHANICAL HVAC ENLARGED DEMO PLAN – LEVEL 03 CONCOURSE – SEGMENT C3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: [],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-md3-203-c3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Enlarged Plan',
        sheet_type_id: '3',
        drawing_number: 'T2.0R-M3.203-C3',
        title:
          'T2 - PH0R - MECHANICAL HVAC ENLARGED PLAN – LEVEL 03 CONCOURSE – SEGMENT C3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m3-203-c3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-MD2.203-E3',
        title:
          'T2 - PH0R - MECHANICAL HVAC DEMOLITION PLAN – LEVEL 03 SECURITY_CONCOURSE – SEGMENT E3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: [],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-md2-203-e3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-MD2.203-D3',
        title:
          'T2 - PH0R - MECHANICAL HVAC DEMOLITION PLAN – LEVEL 03 SECURITY_CONCOURSE – SEGMENT D3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: [],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-md2-203-d3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: null,
        sheet_type_id: null,
        drawing_number: 'T2.0R-M0.003',
        title: 'T2 - PH0R - MECHANICAL CODE COMPLIANCE FORMS',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m0-003',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Diagram',
        sheet_type_id: '8',
        drawing_number: 'T2.0R-M8.001',
        title: 'T2 - PH0R - MECHANICAL DETAILS',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m8-001',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Diagram',
        sheet_type_id: '8',
        drawing_number: 'T2.0R-M8.000',
        title: 'T2 - PH0R - MECHANICAL DETAILS',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m8-000',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: null,
        sheet_type_id: null,
        drawing_number: 'T3.0H-M0.001',
        title: 'T3 - PH0H - MECHANICAL GENERAL NOTES, LEGEND AND ABBREVIATIONS',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: null,
        phase: '0H',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t3-0h-m0-001',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-M2.203-D3',
        title:
          'T2 - PH0R - MECHANICAL HVAC PLAN – LEVEL 03 SECURITY_CONCOURSE – SEGMENT D3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m2-203-d3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-M2.203-C3',
        title:
          'T2 - PH0R - MECHANICAL HVAC PLAN – LEVEL 03 SECURITY_CONCOURSE – SEGMENT C3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m2-203-c3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-M2.103',
        title:
          'T2 - PH0R - MECHANICAL HVAC OVERALL PLAN - LEVEL 3 SECURITY_CONCOURSE',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: ['Mechanical'],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-m2-103',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-MD2.203-C3',
        title:
          'T2 - PH0R - MECHANICAL HVAC DEMOLITION PLAN – LEVEL 03 SECURITY_CONCOURSE – SEGMENT C3',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: [],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-md2-203-c3',
        type: 'progress',
        markups: []
      },
      {
        sheet_type: 'Plan',
        sheet_type_id: '2',
        drawing_number: 'T2.0R-MD2.103',
        title:
          'T2 - PH0R - MECHANICAL HVAC DEMOLITION OVERALL PLAN – LEVEL 03 SECURITY_CONCOURSE',
        geodata: {
          segment: [],
          terminal: ['T2']
        },
        level_number: 'L3',
        phase: '0R',
        discipline: [],
        time: new Date(),
        url_endpoint: 'progress_t2-0r-md2-103',
        type: 'progress',
        markups: []
      }
    ],
    total_files: 195,
    page_count: 10
  };
  const mediaItems: MediaThumbnails = {
    data: [
      {
        title: '20190104_102612',
        url_endpoint: '185148d9c9aaabc89077671a5df22f8e',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102556',
        url_endpoint: 'c28aa3e4e8c0123240b8fff60001193e',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102525',
        url_endpoint: 'cfa7a6080101919bcb7fecc03f05f101',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102513',
        url_endpoint: 'bbab890b01169a13dee610faef00187e',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102458',
        url_endpoint: 'c931c2d251c5a6a28f71fe00f7f1fc66',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102433',
        url_endpoint: '6b4278c3c2c381c3ff1f00716ed80059',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102422',
        url_endpoint: 'd36f6e763233310192f309fcfcfef101',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102330',
        url_endpoint: '8bcffdcfc58111701e0bc018ffcf3fff',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102322',
        url_endpoint: 'e8e8d8cbe7a331f91f60001bef1f37e1',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_102203',
        url_endpoint: '86f09e9f61a2d99cff010018ffff00ff',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101903',
        url_endpoint: '8f0f1f2e4fcf87ab87dbbf78f9fefcfc',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101855',
        url_endpoint: 'debe3e7e3a3e3ebe1f1da1fff0e0f8f0',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101849',
        url_endpoint: '6867b1d8b367cb9319ef27d0b064c890',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101844',
        url_endpoint: '62ec862fdf3c79f037c1842bdefcf8f0',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101814',
        url_endpoint: 'dab8fe7e3ffeda7cd830838830ec96fb',
        type: 'photo',
        geodata: {
          segment: [],
          terminal: []
        }
      },
      {
        title: '20190104_101745',
        url_endpoint: 'ff1f0f0f0f0d0d2fc1e1d07f920e3c7c',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101710',
        url_endpoint: '04f1f399bff1f34700fc0303fffce307',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101612',
        url_endpoint: 'd138fc2078b020308700fcffffc00000',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101609',
        url_endpoint: 'f03f07016171f90100f800ff1fffe000',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      },
      {
        title: '20190104_101544',
        url_endpoint: '3f004f59796d0dfcff0700dea3c9fff0',
        type: 'photo',
        geodata: {
          segment: ['E7'],
          terminal: []
        }
      }
    ],
    total_files: 203,
    page_count: 11
  };
  const specificationItems: SpecificationThumbnails = {
    data: [
      {
        id: 77,
        discipline: [
            'Architectural'
        ],
        phase: [
            '0A',
            '0B',
            '0C',
            '0D',
            '0E',
            '0F',
            '0G',
            '0H',
            '0J',
            '0K',
            '0L',
            '0M',
            '0N',
            '0P',
            '0Q',
            '0R',
            '0S',
            '0S-TI',
            '0T'
        ],
        type: 'specification',
        url_endpoint: 'specification_enabling-092012',
        division: '09',
        spec_number: '092012',
        spec_title: 'PATCHING GYPSUM BOARD SURFACES',
        time: '2018-04-13T01:18:22',
        phase_group: 'Enabling'
      },
      {
        id: 78,
        discipline: [
            'Architectural'
        ],
        phase: [
            '0A',
            '0B',
            '0C',
            '0D',
            '0E',
            '0F',
            '0G',
            '0H',
            '0J',
            '0K',
            '0L',
            '0M',
            '0N',
            '0P',
            '0Q',
            '0R',
            '0S',
            '0S-TI',
            '0T'
        ],
        type: 'specification',
        url_endpoint: 'specification_enabling-092116-23',
        division: '09',
        spec_number: '092116.23',
        spec_title: 'GYPSUM BOARD SHAFT WALL ASSEMBLIES',
        time: '2019-02-26T19:51:03.806861',
        phase_group: 'Enabling'
      },
      {
        id: 79,
        discipline: [
            'Architectural'
        ],
        phase: [
            '0A',
            '0B',
            '0C',
            '0D',
            '0E',
            '0F',
            '0G',
            '0H',
            '0J',
            '0K',
            '0L',
            '0M',
            '0N',
            '0P',
            '0Q',
            '0R',
            '0S',
            '0S-TI',
            '0T'
        ],
        type: 'specification',
        url_endpoint: 'specification_enabling-092216',
        division: '09',
        spec_number: '092216',
        spec_title: 'NON-STRUCTURAL METAL FRAMING',
        time: '2019-02-16T02:13:05.164223',
        phase_group: 'Enabling'
      },
      {
        id: 80,
        discipline: [
            'Architectural'
        ],
        phase: [
            '0A',
            '0B',
            '0C',
            '0D',
            '0E',
            '0F',
            '0G',
            '0H',
            '0J',
            '0K',
            '0L',
            '0M',
            '0N',
            '0P',
            '0Q',
            '0R',
            '0S',
            '0S-TI',
            '0T'
        ],
        type: 'specification',
        url_endpoint: 'specification_enabling-092400',
        division: '09',
        spec_number: '092400',
        spec_title: 'CEMENT PLASTERING',
        time: '2019-02-16T02:40:39.814849',
        phase_group: 'Enabling'
      },
      {
        id: 81,
        discipline: [
            'Architectural'
        ],
        phase: [
            '0A',
            '0B',
            '0C',
            '0D',
            '0E',
            '0F',
            '0G',
            '0H',
            '0J',
            '0K',
            '0L',
            '0M',
            '0N',
            '0P',
            '0Q',
            '0R',
            '0S',
            '0S-TI',
            '0T'
        ],
        type: 'specification',
        url_endpoint: 'specification_enabling-092900',
        division: '09',
        spec_number: '092900',
        spec_title: 'GYPSUM BOARD',
        time: '2019-02-16T02:13:18.660767',
        phase_group: 'Enabling'
      },
      {
        id: 82,
        discipline: [
            'Architectural'
        ],
        phase: [
            '0A',
            '0B',
            '0C',
            '0D',
            '0E',
            '0F',
            '0G',
            '0H',
            '0J',
            '0K',
            '0L',
            '0M',
            '0N',
            '0P',
            '0Q',
            '0R',
            '0S',
            '0S-TI',
            '0T'
        ],
        type: 'specification',
        url_endpoint: 'specification_enabling-093000',
        division: '09',
        spec_number: '093000',
        spec_title: 'TILING',
        time: '2019-02-26T19:52:38.984430',
        phase_group: 'Enabling'
      }
    ],
    total_files: 199,
    page_count: 10
  };
  const selectedDrawingItem: DrawingThumbnailItem = {
    sheet_type: null,
    sheet_type_id: null,
    drawing_number: 'MTD-M6.102',
    title: 'T2_T3 - MECHANICAL DETAILS',
    geodata: {
      segment: ['E7'],
      terminal: []
    },
    level_number: null,
    phase: null,
    discipline: ['Mechanical'],
    time: new Date(),
    url_endpoint: 'progress_mtd-m6-102',
    type: 'progress',
    markups: []
  };
  const selectedMediaItem: MediaThumbnailItem = {
    title: '20190104_102513',
    type: 'photo',
    url_endpoint: 'bbab890b01169a13dee610faef00187e',
    geodata: {
      segment: ['E7'],
      terminal: []
    }
  };
  describe('get adjacent media items', () => {
    const result = [mediaItems.data[2], mediaItems.data[4]];
    it('should return the adjacent media items', () => {
      expect(
        fromPaging.getAdjacentMediaItems.projector(
          mediaItems,
          selectedMediaItem
        )
      ).toEqual(result);
    });
  });

  describe('get media paging items', () => {
    const result = [
      mediaItems.data[0],
      mediaItems.data[1],
      mediaItems.data[18],
      mediaItems.data[19]
    ];
    it('should return the first two and last two items from the data array', () => {
      expect(fromPaging.checkMediaPagingItems.projector(mediaItems)).toEqual(
        result
      );
    });
  });

  describe('get media page count', () => {
    const result = mediaItems.page_count;
    it('should return the number of media item pages', () => {
      expect(fromPaging.getMediaPageCount.projector(mediaItems)).toEqual(
        result
      );
    });
  });

  describe('get adjacent drawing items', () => {
    const result = [drawingItems.data[2], drawingItems.data[4]];
    it('should return the adjacent drawing items', () => {
      expect(
        fromPaging.getAdjacentDrawingItems.projector(
          drawingItems,
          selectedDrawingItem
        )
      ).toEqual(result);
    });
  });

  describe('get drawing paging items', () => {
    const result = [
      drawingItems.data[0],
      drawingItems.data[1],
      drawingItems.data[18],
      drawingItems.data[19]
    ];
    it('should return the first two and last two items from the data array', () => {
      expect(fromPaging.checkDrawingPagingItems.projector(drawingItems)).toEqual(
        result
      );
    });
  });

  describe('get drawing page count', () => {
    const result = drawingItems.page_count;
    it('should return the number of drawing item pages', () => {
      expect(fromPaging.getDrawingPageCount.projector(drawingItems)).toEqual(
        result
      );
    });
  });

  // describe('get adjacent specification items', () => {
  //   const result = [specificationItems.data[2], specificationItems.data[4]];
  //   it('should return the adjacent specification items', () => {
  //     expect(
  //       fromPaging.getAdjacentDrawingItems.projector(
  //         specificationItems,
  //         selectedDrawingItem
  //       )
  //     ).toEqual(result);
  //   });
  // });

  // describe('get specification paging items', () => {
  //   const result = [
  //     specificationItems.data[0],
  //     specificationItems.data[1],
  //     specificationItems.data[18],
  //     specificationItems.data[19]
  //   ];
  //   it('should return the first two and last two items from the data array', () => {
  //     expect(fromPaging.checkSpecificationPagingItems.projector(specificationItems)).toEqual(
  //       result
  //     );
  //   });
  // });

  // describe('get specification page count', () => {
  //   const result = specificationItems.page_count;
  //   it('should return the number of specification item pages', () => {
  //     expect(fromPaging.getSpecificationPageCount.projector(specificationItems)).toEqual(
  //       result
  //     );
  //   });
  // });

});
