import { RouteShorthandOptions } from 'fastify';

export const options: RouteShorthandOptions = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        ids: {
          description: 'Comma separated list of IDs',
          type: 'string',
        },
        user_ids: {
          description: 'Comma separated list of user IDs',
          type: 'string',
        },
        from: {
          description: 'From date',
          type: 'string',
        },
        to: {
          description: 'To date',
          type: 'string',
        },
        show_costs: {
          description: 'Reply contains show costs',
          type: 'boolean',
        },
        show_award_interpretation: {
          description: 'Reply contains award interpretation',
          type: 'boolean',
        },
        show_notes: {
          description: 'Reply contains notes',
          type: 'boolean',
        },
        report_location_id: {
          description: 'Report location id',
          type: 'integer',
        },
        platform: {
          description: 'Reply contains Platform data',
          type: 'boolean',
        },
        updated_after: {
          description: 'Updated after (epoch)',
          type: 'integer',
        },
      },
      anyOf: [{ required: ['ids'] }, { required: ['user_ids'] }, { required: ['from', 'to'] }],
    },
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              description: 'Shift ID',
              type: 'integer',
            },
            timesheet_id: {
              description: 'Timesheet ID',
              type: 'integer',
            },
            user_id: {
              description: 'User ID',
              type: 'integer',
            },
            date: {
              description: 'Date of the shift',
              type: 'string',
            },
            start: {
              description: 'Start time (epoch)',
              type: 'number',
            },
            breaks: {
              description: 'Breaks taken',
              type: 'array',
              optional: true,
              items: {
                type: 'object',
                properties: {
                  id: {
                    description: 'Break ID',
                    type: 'integer',
                  },
                  shift_id: {
                    description: 'Shift ID',
                    type: 'integer',
                  },
                  start: {
                    description: 'Start time (epoch)',
                    type: 'integer',
                  },
                  finish: {
                    description: 'End time (epoch)',
                    type: 'integer',
                  },
                  length: {
                    description: 'Length',
                    type: 'integer',
                  },
                  paid: {
                    descripton: 'Is break paid or not',
                    type: 'boolean',
                  },
                  updated_at: {
                    description: 'Last updated at (epoch)',
                    type: 'integer',
                  },
                },
              },
            },
            finish: {
              description: 'Shift finish (epoch)',
              type: 'integer',
            },
            department_id: {
              description: 'Department ID',
              type: 'integer',
            },
            status: {
              description: 'Shift status',
              type: 'string',
            },
            metadata: {
              description: 'Metadata',
              type: 'string',
              optional: true,
            },
            leave_request_id: {
              description: 'Leave request ID',
              type: 'integer',
              optional: true,
            },
            allowances: {
              description: 'Sum granted as a reimbursement',
              type: 'array',
              optional: true,
              items: {
                id: {
                  description: 'Allowance ID',
                  type: 'integer',
                },
                name: {
                  description: 'Allowance name',
                  type: 'string',
                },
                value: {
                  description: 'Allowance value',
                  type: 'number',
                },
                updated_at: {
                  description: 'Last updated at (epoch)',
                  type: 'integer',
                },
                cost: {
                  description: 'Allowance cost',
                  type: 'number',
                },
              },
            },
            shift_feedback_id: {
              description: 'Feedback ID for the shift',
              type: 'number',
            },
            approved_by: {
              description: 'Approwed by ID',
              type: 'integer',
              optional: true,
            },
            approved_at: {
              description: 'Approwed at (epoch)',
              type: 'integer',
              optional: true,
            },
            award_interpretation: {
              description: 'Award interpretation',
              type: 'array',
              optional: true,
              items: {
                units: {
                  description: 'Units',
                  type: 'number',
                },
                date: {
                  description: 'Date',
                  type: 'string',
                },
                export_name: {
                  description: 'Export',
                  type: 'string',
                },
                secondary_export_name: {
                  description: 'Secondary export',
                  type: 'string',
                  optional: true,
                },
                ordinary_hours: {
                  description: 'Cost',
                  type: 'boolean',
                },
                cost: {
                  description: 'Cost',
                  type: 'number',
                },
                from: {
                  description: 'From',
                  type: 'number',
                  optional: true,
                },
                to: {
                  description: 'To',
                  type: 'number',
                  optional: true,
                },
              },
            },
            cost: {
              description: 'Shift cost',
              type: 'number',
            },
            cost_breakdown: {
              description: 'Cost breakdown',
              type: 'object',
              properties: {
                award_cost: {
                  description: 'Award cost',
                  type: 'number',
                },
                allowance_cost: {
                  description: 'Allowance cost',
                  type: 'number',
                },
              },
            },
            updated_at: {
              description: 'Last updated at (epoch)',
              type: 'integer',
            },
            record_id: {
              description: 'Shift record id',
              type: 'integer',
            },
            last_costed_at: {
              description: 'Last costed at (epoch)',
              type: 'integer',
            },
          },
        },
      },
    },
  },
};
