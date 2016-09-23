/**
 * Copyright (C) 2011-2012 Marcel Beck <marcel.beck@mbeck.org>
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers
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

Ext.define('OMV.module.admin.service.transmissionbt.Bandwidth', {
    extend: 'OMV.workspace.form.Panel',

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getBandwidthSettings',
    rpcSetMethod: 'setBandwidthSettings',

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('Speed'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'speed-limit-down-enabled',
                fieldLabel: _('Limit download'),
                checked: false,
                boxLabel: _('Enable download limit.')
            }, {
                xtype: 'numberfield',
                name: 'speed-limit-down',
                fieldLabel: _('Download'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 100,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Limit download speed. Value is KB/s.')
                }]
            }, {
                xtype: 'checkbox',
                name: 'speed-limit-up-enabled',
                fieldLabel: _('Limit upload'),
                checked: false,
                boxLabel: _('Enable upload limit.')
            }, {
                xtype: 'numberfield',
                name: 'speed-limit-up',
                fieldLabel: _('Upload'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 100,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Limit upload speed. Value is KB/s.')
                }]
            }, {
                xtype: 'numberfield',
                name: 'upload-slots-per-torrent',
                fieldLabel: _('Upload slots'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 14
            }]
        }, {
            xtype: 'fieldset',
            title: _('Turtle mode'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'checkbox',
                name: 'alt-speed-enabled',
                fieldLabel: _('Enable'),
                checked: false,
                boxLabel: _('Enable turtle mode.')
            }, {
                xtype: 'numberfield',
                name: 'alt-speed-down',
                fieldLabel: _('Download'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 50,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Turtle mode download speed. Value is KB/s.')
                }]
            }, {
                xtype: 'numberfield',
                name: 'alt-speed-up',
                fieldLabel: _('Upload'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 50,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Turtle mode upload speed. Value is KB/s.')
                }]
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'bandwidth',
    path: '/service/transmissionbt',
    text: _('Bandwidth'),
    position: 20,
    className: 'OMV.module.admin.service.transmissionbt.Bandwidth'
});
