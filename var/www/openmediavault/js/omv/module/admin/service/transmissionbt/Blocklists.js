/**
 * Copyright (C) 2016 OpenMediaVault Plugin Developers
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/form/plugin/LinkedFields.js")

Ext.define('OMV.module.admin.service.transmissionbt.Blocklists', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getBlocklistsSettings',
    rpcSetMethod: 'setBlocklistsSettings',

    plugins: [{
        ptype: 'linkedfields',
        correlations: [{
            name: 'blocklist-url',
            conditions: [{
                name: 'blocklist-enabled',
                value: true
            }],
            properties: ['!readOnly', '!allowBlank']
        }, {
            name: 'blocklist-sync-frequency',
            conditions: [{
                name: 'blocklist-sync-enabled',
                value: true
            }],
            properties: ['!readOnly', '!allowBlank']
        }]
    }],

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('Blocklists'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'blocklist-enabled',
                fieldLabel: _('Enable'),
                checked: false,
                boxLabel: _('Use blocklists.')
            }, {
                xtype: 'checkbox',
                name: 'blocklist-sync-enabled',
                fieldLabel: _('Auto sync'),
                checked: false,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Update blocklists automatically. This requires the RPC to be enabled.')
                }]
            }, {
                xtype: 'combo',
                name: 'blocklist-sync-frequency',
                fieldLabel: _('Sync frequency'),
                queryMode: 'local',
                store: Ext.create('Ext.data.SimpleStore', {
                    fields: [
                        'value',
                        'text'
                    ],
                    data: [
                        ['hourly', _('Hourly')],
                        ['daily', _('Daily')],
                        ['weekly', _('Weekly')],
                        ['monthly', _('Monthly')]
                    ]
                }),
                displayField: 'text',
                valueField: 'value',
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                value: 'daily'
            }, {
                xtype: 'textfield',
                name: 'blocklist-url',
                fieldLabel: _('URL'),
                vtype: 'url',
                allowBlank: true,
                width: 300,
                value: 'http://www.example.com/blocklist',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('The URL of the blocklist.')
                }]
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'blocklists',
    path: '/service/transmissionbt',
    text: _('Blocklists'),
    position: 10,
    className: 'OMV.module.admin.service.transmissionbt.Blocklists'
});
