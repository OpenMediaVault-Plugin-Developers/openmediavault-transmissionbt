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

Ext.define('OMV.module.admin.service.transmissionbt.Rpc', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getRpcSettings',
    rpcSetMethod: 'setRpcSettings',

    plugins: [{
        ptype: 'linkedfields',
        correlations: [{
            name: [
                'rpc-username',
                'rpc-password'
            ],
            conditions: [{
                name: 'rpc-authentication-required',
                value: true
            }],
            properties: [
                '!readOnly',
                '!allowBlank'
            ]
        }]
    }],

    getButtonItems: function() {
        var items = this.callParent(arguments);

        items.push({
            id: this.getId() + '-show',
            xtype: 'button',
            text: _('Show'),
            icon: 'images/search.png',
            iconCls: Ext.baseCSSPrefix + 'btn-icon-16x16',
            scope: this,
            handler: function() {
                var port = this.findField('rpc-port').getValue();
                window.open('http://' + location.hostname + ':' + port, '_blank');
            }
        });

        return items;
    },

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('RPC/web interface settings'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'rpc-enabled',
                fieldLabel: _('Enable'),
                checked: false
            }, {
                xtype: 'numberfield',
                name: 'rpc-port',
                fieldLabel: _('Port'),
                vtype: 'port',
                minValue: 1024,
                maxValue: 65535,
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 9091,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Port to open and listen for RPC/web requests on.')
                }]
            }, {
                xtype: 'checkbox',
                name: 'rpc-authentication-required',
                fieldLabel: _('Authentication'),
                checked: true,
                boxLabel: _('Require clients to authenticate themselves.')
            }, {
                xtype: 'textfield',
                name: 'rpc-username',
                fieldLabel: _('Username'),
                allowBlank: false,
                vtype: 'username',
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Used for client authentication.')
                }]
            }, {
                xtype: 'passwordfield',
                name: 'rpc-password',
                fieldLabel: _('Password'),
                allowBlank: false,
                regex: /^[^'"\\]+$/,
                regexText: _('You\'ve used one of the following characters which is not allowed: \' " \\'),
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Used for client authentication.')
                }]
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'rpc',
    path: '/service/transmissionbt',
    text: _('RPC'),
    position: 70,
    className: 'OMV.module.admin.service.transmissionbt.Rpc'
});
