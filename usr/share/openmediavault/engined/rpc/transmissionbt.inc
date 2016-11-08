<?php
/**
 * Copyright (C) 2009-2012 Volker Theile <volker.theile@openmediavault.org>
 * Copyright (C) 2011-2012 Marcel Beck <marcel.beck@mbeck.org>
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers.
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

namespace OMV\Engined\Rpc;

use OMV\Config\Database;
use OMV\Exception;
use OMV\Rpc\ServiceAbstract;

class TransmissionBt extends ServiceAbstract
{
    /**
     * @var Database
     */
    private $database;

    /**
     * @var string
     */
    private $dataModelPath = 'conf.service.transmissionbt';

    /**
     * @var string
     */
    private $bandwidthDataModelPath = 'conf.service.transmissionbt.bandwidth';

    /**
     * @var string
     */
    private $blocklistsDataModelPath = 'conf.service.transmissionbt.blocklists';

    /**
     * @var string*/
    private $filesAndLocationsDataModelPath = 'conf.service.transmissionbt.filesandlocations';

    /**
     * @var string
     */
    private $peerDataModelPath = 'conf.service.transmissionbt.peer';

    /**
     * @var string
     */
    private $queuingDataModelPath = 'conf.service.transmissionbt.queuing';

    /**
     * @var string
     */
    private $rpcDataModelPath = 'conf.service.transmissionbt.rpc';

    /**
     * @var string
     */
    private $schedulingDataModelPath = 'conf.service.transmissionbt.scheduling';

    public function __construct(Database $database = null)
    {
        $this->database = $database ?: Database::getInstance();
    }

    /**
     * Get the RPC service name.
     *
     * @return string
     */
    public function getName()
    {
        return 'TransmissionBt';
    }

    /**
     * Initialize the RPC service.
     *
     * @return void
     */
    public function initialize()
    {
        $this->registerMethod('getSettings');
        $this->registerMethod('setSettings');
        $this->registerMethod('getBandwidthSettings');
        $this->registerMethod('setBandwidthSettings');
        $this->registerMethod('getBlocklistsSettings');
        $this->registerMethod('setBlocklistsSettings');
        $this->registerMethod('getFilesAndLocationsSettings');
        $this->registerMethod('setFilesAndLocationsSettings');
        $this->registerMethod('getQueuingSettings');
        $this->registerMethod('setQueuingSettings');
        $this->registerMethod('getPeerSettings');
        $this->registerMethod('setPeerSettings');
        $this->registerMethod('getRpcSettings');
        $this->registerMethod('setRpcSettings');
        $this->registerMethod('getSchedulingSettings');
        $this->registerMethod('setSchedulingSettings');
    }

    /**
     * Get the general settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->dataModelPath);
        $object->remove('modules');

        return $object->getAssoc();
    }

    /**
     * Set the general settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setsettings');

        $object = $this->database->get($this->dataModelPath);
        $object->setAssoc($params);

        // If no directory for downloads is set and the user is trying to
        // enable the service, abort the save.
        $filesAndLocations = $this->database->get($this->filesAndLocationsDataModelPath);
        $downloadFolderRef = $filesAndLocations->get('download-sharedfolderref');

        if ($object->get('enable') && empty($downloadFolderRef)) {
            throw new Exception('No directory for downloads set, please set one before enabling the service');
        }

        $this->database->set($object);

        $object->remove('modules');

        return $object->getAssoc();
    }

    /**
     * Get the bandwidth settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getBandwidthSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->bandwidthDataModelPath);

        return $object->getAssoc();
    }

    /**
     * Set the bandwidth settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setBandwidthSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setbandwidthsettings');

        $object = $this->database->get($this->bandwidthDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        return $object->getAssoc();
    }

    /**
     * Get the blocklists settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getBlocklistsSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->blocklistsDataModelPath);

        return $object->getAssoc();
    }

    /**
     * Set the blocklists settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setBlocklistsSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setblocklistssettings');

        $object = $this->database->get($this->blocklistsDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        return $object->getAssoc();
    }

    /**
     * Get the locations and files settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getFilesAndLocationsSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->filesAndLocationsDataModelPath);

        return $object->getAssoc();
    }

    /**
     * Set the locations and files settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setFilesAndLocationsSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setfilesandlocationssettings');

        $object = $this->database->get($this->filesAndLocationsDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        return $object->getAssoc();
    }

    /**
     * Get the peer settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getPeerSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->peerDataModelPath);

        return $object->getAssoc();
    }

    /**
     * Set the peer settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setPeerSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setpeersettings');

        $object = $this->database->get($this->peerDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        return $object->getAssoc();
    }

    /**
     * Get the queuing settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getQueuingSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->queuingDataModelPath);

        return $object->getAssoc();
    }

    /**
     * Set the queueing settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setQueuingSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setqueuingsettings');

        $object = $this->database->get($this->queuingDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        return $object->getAssoc();
    }

    /**
     * Get the RPC settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getRpcSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->rpcDataModelPath);

        return $object->getAssoc();
    }

    /**
     * Set the RPC settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setRpcSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setrpcsettings');

        $object = $this->database->get($this->rpcDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        return $object->getAssoc();
    }

    /**
     * Get the scheduling settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function getSchedulingSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);

        $object = $this->database->get($this->schedulingDataModelPath);

        $altSpeedTimeBegin = $object->get('alt-speed-time-begin');
        $altSpeedTimeDay = $object->get('alt-speed-time-day');
        $altSpeedTimeEnd = $object->get('alt-speed-time-end');

        // Add the time options.
        $object->add('begin-hour', 'integer');
        $object->add('begin-minute', 'integer');
        $object->add('end-hour', 'integer');
        $object->add('end-minute', 'integer');

        // Set the time options.
        $object->set('begin-hour', (int) floor($altSpeedTimeBegin / 60));
        $object->set('begin-minute', $altSpeedTimeBegin % 60);
        $object->set('end-hour', (int) floor($altSpeedTimeEnd / 60));
        $object->set('end-minute', $altSpeedTimeEnd % 60);

        // Add the days options.
        $object->add('days-sunday', 'boolean');
        $object->add('days-monday', 'boolean');
        $object->add('days-tuesday', 'boolean');
        $object->add('days-wednesday', 'boolean');
        $object->add('days-thursday', 'boolean');
        $object->add('days-friday', 'boolean');
        $object->add('days-saturday', 'boolean');

        // Calculate the enabled days. If the correct bit is set the day is
        // enabled.
        $object->set('days-sunday', ($altSpeedTimeDay & 1) === 1);
        $object->set('days-monday', ($altSpeedTimeDay & 2) === 2);
        $object->set('days-tuesday', ($altSpeedTimeDay & 4) === 4);
        $object->set('days-wednesday', ($altSpeedTimeDay & 8) === 8);
        $object->set('days-thursday', ($altSpeedTimeDay & 16) === 16);
        $object->set('days-friday', ($altSpeedTimeDay & 32) === 32);
        $object->set('days-saturday', ($altSpeedTimeDay & 64) === 64);

        return $object->getAssoc();
    }

    /**
     * Set the scheduling settings.
     *
     * @param array $params
     * @param array $context
     *
     * @return array
     */
    public function setSchedulingSettings($params, $context)
    {
        $this->validateMethodContext($context, ['role' => OMV_ROLE_ADMINISTRATOR]);
        $this->validateMethodParams($params, 'rpc.transmissionbt.setschedulingsettings');

        $altSpeedTimeDay = 0;

        if ($params['days-sunday']) {
            $altSpeedTimeDay += 1;
        }

        if ($params['days-monday']) {
            $altSpeedTimeDay += 2;
        }

        if ($params['days-tuesday']) {
            $altSpeedTimeDay += 4;
        }

        if ($params['days-wednesday']) {
            $altSpeedTimeDay += 8;
        }

        if ($params['days-thursday']) {
            $altSpeedTimeDay += 16;
        }

        if ($params['days-friday']) {
            $altSpeedTimeDay += 32;
        }

        if ($params['days-saturday']) {
            $altSpeedTimeDay += 64;
        }

        $params['alt-speed-time-day'] = $altSpeedTimeDay;

        $params['alt-speed-time-begin'] = ($params['begin-hour'] * 60) + $params['begin-minute'];
        $params['alt-speed-time-end'] = ($params['end-hour'] * 60) + $params['end-minute'];

        unset($params['days-sunday']);
        unset($params['days-monday']);
        unset($params['days-tuesday']);
        unset($params['days-wednesday']);
        unset($params['days-thursday']);
        unset($params['days-friday']);
        unset($params['days-saturday']);

        unset($params['begin-hour']);
        unset($params['begin-minute']);
        unset($params['end-hour']);
        unset($params['end-minute']);

        $object = $this->database->get($this->schedulingDataModelPath);
        $object->setAssoc($params);

        $this->database->set($object);

        // Avoid having to remove and set all options manually again.
        return $this->callMethod('getSchedulingSettings', [], $context);
    }
}
